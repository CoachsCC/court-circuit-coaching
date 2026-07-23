export const site = {
  name: "Court-Circuit · Coaching Sportif",
  /**
   * Domaine de production canonique. Sert de base à `metadataBase`, au sitemap,
   * au robots et aux données structurées. Hypothèse : le domaine legacy migré
   * (cf. redirections dans `next.config.ts`). À corriger ICI seul si besoin.
   */
  url: "https://www.court-circuit-coaching.fr",
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

/** Chiffre interne au club, sans rapport avec l'API Google. */
export const CLUB_MEMBERS = 250;

// Les vignettes Instagram statiques ont été retirées : le feed vient désormais
// de l'API (lib/instagram.ts), et la section se masque si l'appel échoue.
// Réafficher trois photos de la salle en boucle laisserait croire à un compte
// actif alors que rien n'est branché.
