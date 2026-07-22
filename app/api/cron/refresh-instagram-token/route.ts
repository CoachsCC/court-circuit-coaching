import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { refreshInstagramToken } from "@/lib/instagram";
import { triggerRedeploy, updateProjectEnv, vercelConfig } from "@/lib/vercel-env";

// Jamais de cache : la route écrit un secret, elle doit s'exécuter à chaque appel.
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Comparaison à temps constant. Un `===` sur un secret fuit sa longueur et son
 * préfixe par le temps de réponse — marginal ici, mais gratuit à éviter.
 */
function secretMatches(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Rafraîchit le jeton Instagram longue durée et écrit la nouvelle valeur dans
 * les variables d'environnement Vercel du projet.
 *
 * Déclenchée par Vercel Cron (voir `vercel.json`). Vercel envoie alors
 * l'en-tête `Authorization: Bearer $CRON_SECRET` ; sans cette vérification,
 * n'importe qui pourrait provoquer des rotations de jeton en boucle et faire
 * tomber le feed.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;

  if (!secret) {
    console.error("[cron/instagram] CRON_SECRET absent — route refusée par sécurité.");
    return NextResponse.json({ error: "Cron non configuré." }, { status: 500 });
  }

  const header = request.headers.get("authorization") ?? "";
  if (!secretMatches(header, `Bearer ${secret}`)) {
    // 404 plutôt que 401 : ne pas confirmer l'existence de la route.
    return NextResponse.json({ error: "Introuvable." }, { status: 404 });
  }

  const current = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!current) {
    console.error("[cron/instagram] INSTAGRAM_ACCESS_TOKEN absent — rien à rafraîchir.");
    return NextResponse.json({ error: "Jeton Instagram absent." }, { status: 500 });
  }

  const vercel = vercelConfig();
  if (!vercel) {
    console.error(
      "[cron/instagram] VERCEL_API_TOKEN / VERCEL_PROJECT_ID / VERCEL_TEAM_ID manquants : " +
        "le jeton serait renouvelé sans pouvoir être enregistré. Abandon avant l'appel.",
    );
    return NextResponse.json({ error: "Accès Vercel non configuré." }, { status: 500 });
  }

  try {
    const { token, expiresInDays } = await refreshInstagramToken(current);
    const targets = await updateProjectEnv(vercel, "INSTAGRAM_ACCESS_TOKEN", token);
    const redeployed = await triggerRedeploy();

    if (!redeployed) {
      console.warn(
        "[cron/instagram] Jeton enregistré mais AUCUN redéploiement déclenché " +
          "(VERCEL_DEPLOY_HOOK_URL absent). Vercel fige les variables au build : " +
          "le site tourne encore avec l'ancien jeton jusqu'au prochain déploiement.",
      );
    }

    console.log(
      `[cron/instagram] Jeton renouvelé pour ~${expiresInDays} jours, ` +
        `écrit sur : ${targets.join(", ")}. Redéploiement : ${redeployed ? "oui" : "non"}.`,
    );

    // Aucun jeton dans la réponse : elle transite par les logs de Vercel Cron.
    return NextResponse.json({ ok: true, expiresInDays, targets, redeployed });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue.";
    console.error(`[cron/instagram] Échec : ${message}`);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
