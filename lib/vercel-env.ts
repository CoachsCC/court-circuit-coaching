import "server-only";

const API = "https://api.vercel.com";

type EnvEntry = { id: string; key: string; target?: string[] };

type VercelConfig = { token: string; projectId: string; teamId: string };

/**
 * Identifiants nécessaires pour écrire une variable d'environnement depuis le
 * site lui-même. Volontairement distincts du jeton de déploiement : celui-ci
 * ne sert qu'à cette écriture, et se révoque sans rien casser d'autre.
 */
export function vercelConfig(): VercelConfig | null {
  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!token || !projectId || !teamId) return null;
  return { token, projectId, teamId };
}

/**
 * Remplace la valeur d'une variable sur TOUTES les cibles où elle existe.
 *
 * Une variable créée séparément pour `preview` et `production` porte deux
 * identifiants distincts : n'en mettre qu'un à jour laisserait l'autre
 * environnement avec un jeton périmé, et le bug ne se verrait que 60 jours
 * plus tard, sur un seul des deux.
 *
 * Renvoie les cibles effectivement mises à jour.
 */
export async function updateProjectEnv(
  { token, projectId, teamId }: VercelConfig,
  key: string,
  value: string,
): Promise<string[]> {
  const listed = await fetch(`${API}/v9/projects/${projectId}/env?teamId=${teamId}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!listed.ok) {
    throw new Error(
      `Lecture des variables impossible (HTTP ${listed.status}) : ${await listed.text().catch(() => "")}`,
    );
  }

  const { envs = [] }: { envs?: EnvEntry[] } = await listed.json();
  const matches = envs.filter((entry) => entry.key === key);

  if (!matches.length) {
    throw new Error(`Aucune variable « ${key} » sur ce projet Vercel.`);
  }

  const updated: string[] = [];

  for (const entry of matches) {
    const response = await fetch(
      `${API}/v9/projects/${projectId}/env/${entry.id}?teamId=${teamId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(
        `Écriture de « ${key} » (${entry.target?.join(", ")}) refusée : ` +
          `HTTP ${response.status} ${await response.text().catch(() => "")}`,
      );
    }

    updated.push(...(entry.target ?? ["inconnue"]));
  }

  return updated;
}

/**
 * Déclenche un redéploiement via un Deploy Hook.
 *
 * Indispensable : Vercel fige les variables d'environnement au moment du build.
 * Écrire la nouvelle valeur ne change donc RIEN au déploiement en cours, qui
 * continue d'utiliser l'ancien jeton jusqu'à son expiration. Sans ce
 * redéploiement, le rafraîchissement automatique ne sert à rien.
 */
export async function triggerRedeploy(): Promise<boolean> {
  const hook = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!hook) return false;

  const response = await fetch(hook, { method: "POST", cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Deploy Hook refusé : HTTP ${response.status}`);
  }
  return true;
}
