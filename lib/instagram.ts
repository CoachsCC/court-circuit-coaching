import "server-only";

export type InstagramPost = {
  id: string;
  /** Image à afficher — la miniature pour les vidéos. */
  imageUrl: string;
  permalink: string;
  caption: string;
  isVideo: boolean;
};

type MediaItem = {
  id: string;
  caption?: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
};

/** Nombre de vignettes de la grille 3×2 du design. */
const POST_COUNT = 6;

/**
 * Récupère les derniers posts du compte.
 *
 * ⚠️ L'API Instagram Basic Display a été fermée par Meta le 4 décembre 2024.
 * On passe donc par l'API Instagram avec Instagram Login (graph.instagram.com),
 * qui impose un compte professionnel ou créateur.
 *
 * ⚠️ Le jeton longue durée expire au bout de 60 jours et doit être rafraîchi
 * avant échéance (voir `refreshInstagramToken`). Passé ce délai, l'appel échoue
 * et la section disparaît silencieusement — prévoir un rappel ou une tâche
 * planifiée.
 *
 * Renvoie un tableau vide en cas d'échec : la section est alors masquée plutôt
 * que d'afficher des images mortes.
 */
export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!token || !userId) return [];

  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink";
  const url = `https://graph.instagram.com/v21.0/${userId}/media?fields=${fields}&limit=${POST_COUNT}&access_token=${token}`;

  try {
    const response = await fetch(url, {
      // Les URLs média d'Instagram sont signées et expirent : ne pas mettre en
      // cache trop longtemps, sinon la grille se remplit d'images cassées.
      next: { revalidate: 3_600 },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error(`[instagram] HTTP ${response.status} — section masquée.`, body.slice(0, 300));
      return [];
    }

    const data: { data?: MediaItem[] } = await response.json();
    const items = data.data ?? [];

    if (!items.length) {
      console.warn("[instagram] Aucun média renvoyé — section masquée.");
      return [];
    }

    return items
      .map((item): InstagramPost | null => {
        const isVideo = item.media_type === "VIDEO";
        // Une vidéo n'a pas d'image exploitable dans media_url : c'est le flux.
        const imageUrl = isVideo ? item.thumbnail_url : item.media_url;
        if (!imageUrl || !item.permalink) return null;

        return {
          id: item.id,
          imageUrl,
          permalink: item.permalink,
          caption: item.caption?.trim() ?? "",
          isVideo,
        };
      })
      .filter((post): post is InstagramPost => post !== null)
      .slice(0, POST_COUNT);
  } catch (err) {
    console.error("[instagram] Appel impossible — section masquée.", err);
    return [];
  }
}

/**
 * Prolonge un jeton longue durée de 60 jours à compter de l'appel.
 *
 * ⚠️ Instagram refuse de rafraîchir un jeton de moins de 24 heures : appeler
 * cette fonction trop souvent renvoie une erreur, pas un nouveau jeton.
 *
 * Lève en cas d'échec plutôt que de renvoyer `null` : contrairement à
 * l'affichage du feed, une expiration silencieuse ici casserait l'intégration
 * deux mois plus tard, sans lien visible avec la cause.
 */
export async function refreshInstagramToken(
  token: string,
): Promise<{ token: string; expiresInDays: number }> {
  const response = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`,
    { cache: "no-store" },
  );

  const body = await response.text();

  if (!response.ok) {
    // Le corps peut contenir le jeton en clair dans certains messages d'erreur
    // Meta : ne jamais le propager tel quel dans un log ou une réponse HTTP.
    throw new Error(`Instagram a refusé le rafraîchissement (HTTP ${response.status}).`);
  }

  const data: { access_token?: string; expires_in?: number } = JSON.parse(body);

  if (!data.access_token) {
    throw new Error("Réponse Instagram sans `access_token`.");
  }

  return {
    token: data.access_token,
    expiresInDays: Math.round((data.expires_in ?? 0) / 86_400),
  };
}
