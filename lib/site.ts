export const site = {
  name: "Court-Circuit · Coaching Sportif",
  city: "Saint-Herblain",
  since: 2013,
  address: "22 rue du Moulin de la Rousselière, 44800 Saint-Herblain",
  email: "court.circuit.coaching@gmail.com",
  instagram: {
    handle: "@courtcircuit.coaching",
    url: "https://instagram.com/courtcircuit.coaching",
  },
  coaches: {
    antoine: { name: "Antoine", phone: "0684394917", phoneDisplay: "06 84 39 49 17" },
    francesco: { name: "Francesco", phone: "0634392132", phoneDisplay: "06 34 39 21 32" },
  },
  /** Main site contact — CTAs and the WhatsApp FAB both point here. */
  whatsapp: "https://wa.me/33634392132",
} as const;

export const routes = {
  home: "/",
  crossTraining: "/cross-training",
  cardioBoxing: "/cardio-boxing",
  salle: "/la-salle",
  tarifs: "/tarifs",
  essai: "/seance-essai",
  mentionsLegales: "/mentions-legales",
} as const;

/**
 * Placeholder values. TODO(integration): fetch from the Google Places API
 * (Place Details -> rating, user_ratings_total, reviews) so these stay in sync
 * with the Google Business listing.
 */
export const googleReviews = {
  rating: "5,0",
  reviewCount: 147,
  members: 250,
  testimonials: [
    {
      quote: "« Jamais tenu aussi longtemps dans une salle. Ici on me pousse sans me juger. »",
      author: "Julie — adhérente depuis 2 ans",
      photo: null,
    },
    {
      quote: "« Deux coachs qui connaissent mon prénom et mes objectifs. Ça change tout. »",
      author: "Karim — adhérent depuis 4 ans",
      photo: null,
    },
    {
      quote: "« Partie de zéro, sédentaire total. Un an après je fais du cardio boxing. »",
      author: "Sophie — adhérente depuis 1 an",
      photo: null,
    },
  ],
} as const;

/**
 * Placeholder thumbnails. TODO(integration): replace with the latest posts from
 * the Instagram Basic Display API (or a light self-hosted widget). Never an
 * embed iframe — too heavy for a mobile-first page.
 */
export const instagramFeed = [
  "/assets/gym-boxes.jpg",
  "/assets/gym-rig.jpg",
  "/assets/gym-wide.jpg",
  "/assets/gym-rig.jpg",
  "/assets/gym-wide.jpg",
  "/assets/gym-boxes.jpg",
] as const;
