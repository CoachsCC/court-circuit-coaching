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
  /** `google` = données fraîches, `fallback` = valeurs figées de secours. */
  source: "google" | "fallback";
};

/**
 * Valeurs de secours. Servent tant que l'API n'est pas configurée, et en cas
 * de panne : la page doit rester debout, jamais afficher 0 avis.
 * TODO: à retirer une fois l'intégration en place et éprouvée.
 */
const FALLBACK: ReviewsData = {
  rating: "5,0",
  reviewCount: 147,
  source: "fallback",
  reviews: [
    {
      quote: "« Jamais tenu aussi longtemps dans une salle. Ici on me pousse sans me juger. »",
      author: "Julie",
      photo: null,
      authorUrl: null,
      rating: 5,
      publishedAgo: "adhérente depuis 2 ans",
    },
    {
      quote: "« Deux coachs qui connaissent mon prénom et mes objectifs. Ça change tout. »",
      author: "Karim",
      photo: null,
      authorUrl: null,
      rating: 5,
      publishedAgo: "adhérent depuis 4 ans",
    },
    {
      quote: "« Partie de zéro, sédentaire total. Un an après je fais du cardio boxing. »",
      author: "Sophie",
      photo: null,
      authorUrl: null,
      rating: 5,
      publishedAgo: "adhérente depuis 1 an",
    },
  ],
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

    if (typeof data.rating !== "number" || !data.reviews?.length) {
      console.error("[google-reviews] Réponse sans note ni avis — repli.", data);
      return FALLBACK;
    }

    const reviews: Review[] = data.reviews
      .filter((r) => (r.text?.text ?? r.originalText?.text)?.trim())
      .map((r) => ({
        quote: `« ${(r.text?.text ?? r.originalText?.text ?? "").trim()} »`,
        author: r.authorAttribution?.displayName ?? "Adhérent",
        photo: r.authorAttribution?.photoUri ?? null,
        authorUrl: r.authorAttribution?.uri ?? null,
        rating: r.rating ?? 5,
        publishedAgo: r.relativePublishTimeDescription ?? "",
      }));

    if (!reviews.length) return FALLBACK;

    return {
      // Google renvoie 4.9 ; la France écrit 4,9.
      rating: data.rating.toFixed(1).replace(".", ","),
      reviewCount: data.userRatingCount ?? FALLBACK.reviewCount,
      reviews,
      source: "google",
    };
  } catch (err) {
    console.error("[google-reviews] Appel impossible — repli.", err);
    return FALLBACK;
  }
}
