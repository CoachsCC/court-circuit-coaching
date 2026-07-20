import type { NextConfig } from "next";

/**
 * Redirections depuis l'ancien site Vistalid (court-circuit-coaching.fr).
 * Inventaire relevé le 2026-07-20 : 17 URLs répondaient 200, plus /fr/page/accueil
 * en 302. Aucune ne doit tomber en 404 après la refonte — le référencement local
 * repose largement sur les landings /[prestation]/saint-herblain.
 *
 * ⚠️ Les entrées marquées PROVISOIRE pointent vers un contenu approchant faute
 * de page équivalente sur le nouveau site. À trancher : soit on recrée la page,
 * soit on assume la redirection.
 */
const LEGACY_REDIRECTS: { source: string; destination: string }[] = [
  // — Pages principales, équivalent direct —
  { source: "/fr/page/accueil", destination: "/" },
  { source: "/fr/page/la-salle", destination: "/la-salle" },
  { source: "/fr/page/cross-training", destination: "/cross-training" },
  { source: "/fr/page/cardio-boxing", destination: "/cardio-boxing" },

  // — Landings SEO locales, équivalent direct —
  { source: "/cross-training/saint-herblain", destination: "/cross-training" },
  { source: "/cardio-boxing/saint-herblain", destination: "/cardio-boxing" },
  { source: "/crossfit/saint-herblain", destination: "/cross-training" },
  { source: "/preparation-physique/saint-herblain", destination: "/cross-training" },
  { source: "/salle-de-sport/saint-herblain", destination: "/" },
  { source: "/salle-de-fitness/saint-herblain", destination: "/" },
  { source: "/coach-sportif/saint-herblain", destination: "/" },

  { source: "/fr/page/mentions-legales", destination: "/mentions-legales" },

  // Pas de page planning dédiée : les créneaux vivent sur les pages cours.
  { source: "/fr/page/planning", destination: "/" },

  // — PROVISOIRE : pas de page contact, l'essai fait office de point d'entrée —
  { source: "/fr/page/contact", destination: "/seance-essai" },

  // — PROVISOIRE : coaching privé et en entreprise restent proposés par le club
  //   mais sont hors périmètre de cette refonte. À remplacer par les vraies
  //   pages dès qu'elles existent, sinon ces prestations restent invisibles. —
  { source: "/fr/page/coaching-prive", destination: "/" },
  { source: "/fr/page/coaching-sportif-en-entreprise", destination: "/" },
  { source: "/coach-sportif-en-entreprises/saint-herblain", destination: "/" },
  { source: "/formation-geste-et-posture/saint-herblain", destination: "/" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return LEGACY_REDIRECTS.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true, // 301 : transfère le jus SEO de l'ancienne URL
    }));
  },
};

export default nextConfig;
