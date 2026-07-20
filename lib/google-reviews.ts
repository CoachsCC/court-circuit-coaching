import "server-only";

export type Review = {
  quote: string;
  author: string;
  /** Photo de profil Google. L'attribution de l'auteur est exigée par Google. */
  photo: string | null;
  /** Lien vers l'avis ou le profil, exigé par Google. */
  authorUrl: string | null;
  rating: number;
  /** « il y a 2 mois » — fourni tel quel par l'API, déjà localisé. */
  publishedAgo: string;
};

export type ReviewsData = {
  rating: string;
  reviewCount: number;
  reviews: Review[];
  /**
   * `google`   — note, total et avis viennent de l'API.
   * `partial`  — note et total réels, mais avis indisponibles (SKU Atmosphere
   *              non provisionné) : on garde les vrais chiffres et on retombe
   *              sur les témoignages statiques.
   * `fallback` — rien n'a pu être récupéré.
   */
  source: "google" | "partial" | "fallback";
};

/**
 * Valeurs de secours pour la note et le total, afin que la page reste debout
 * si l'API tombe. Elles reflètent l'état réel de la fiche Google au 2026-07-20.
 *
 * `reviews` est volontairement vide : les témoignages du fichier de design
 * (Julie, Karim, Sophie) étaient du texte d'illustration, pas de vrais retours
 * d'adhérents. Les afficher sous un « ★ 5,0 · 147 avis Google » les ferait
 * passer pour authentiques. Tant que Google ne renvoie pas de vrais avis, la
 * section témoignages ne s'affiche pas.
 */
const FALLBACK: ReviewsData = {
  rating: "5,0",
  reviewCount: 147,
  source: "fallback",
  reviews: [],
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: {
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: { displayName?: string; photoUri?: string; uri?: string };
  }[];
};

/**
 * Places API (New). L'ancienne Place Details n'est plus ouverte aux nouveaux
 * projets. Google ne renvoie au maximum que 5 avis, choisis par ses soins :
 * impossible de sélectionner lesquels ni d'en obtenir davantage.
 *
 * Les avis doivent être affichés tels quels, avec le nom de l'auteur, sa photo
 * et un lien — les modifier ou les tronquer viole les conditions d'utilisation.
 */
export async function getGoogleReviews(): Promise<ReviewsData> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!key || !placeId) {
    return FALLBACK;
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?languageCode=fr`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        // Un appel par jour : le quota Google est facturé à la requête et les
        // avis ne bougent pas d'une minute à l'autre.
        next: { revalidate: 86_400 },
      },
    );

    if (!response.ok) {
      console.error(
        `[google-reviews] HTTP ${response.status} — repli sur les valeurs statiques.`,
        await response.text().catch(() => ""),
      );
      return FALLBACK;
    }

    const data: PlacesResponse = await response.json();

    if (typeof data.rating !== "number") {
      console.error("[google-reviews] Réponse sans note — repli complet.", data);
      return FALLBACK;
    }

    // Note et total sont exploitables même si les avis manquent : ne pas jeter
    // de la donnée fraîche parce qu'une partie de la réponse est vide.
    const stats = {
      // Google renvoie 4.9 ; la France écrit 4,9.
      rating: data.rating.toFixed(1).replace(".", ","),
      reviewCount: data.userRatingCount ?? FALLBACK.reviewCount,
    };

    const reviews: Review[] = (data.reviews ?? [])
      .filter((r) => (r.text?.text ?? r.originalText?.text)?.trim())
      .map((r) => ({
        quote: `« ${(r.text?.text ?? r.originalText?.text ?? "").trim()} »`,
        author: r.authorAttribution?.displayName ?? "Adhérent",
        photo: r.authorAttribution?.photoUri ?? null,
        authorUrl: r.authorAttribution?.uri ?? null,
        rating: r.rating ?? 5,
        publishedAgo: r.relativePublishTimeDescription ?? "",
      }));

    if (!reviews.length) {
      console.warn(
        "[google-reviews] Note et total récupérés, mais aucun avis renvoyé. " +
          "Le champ `reviews` relève du SKU Enterprise + Atmosphere : vérifier " +
          "la facturation du projet Google Cloud et les restrictions de la clé.",
      );
      return { ...stats, reviews: [], source: "partial" };
    }

    return { ...stats, reviews, source: "google" };
  } catch (err) {
    console.error("[google-reviews] Appel impossible — repli.", err);
    return FALLBACK;
  }
}
