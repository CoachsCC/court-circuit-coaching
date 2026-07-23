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
  images: {
    // Aligné sur le revalidate d'une heure de lib/instagram.ts : les URLs du CDN
    // Instagram sont signées, mieux vaut ne pas garder longtemps une version
    // optimisée dont l'original ne serait plus téléchargeable.
    minimumCacheTTL: 3_600,
    remotePatterns: [
      // Photos de profil des auteurs d'avis Google.
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      // Médias Instagram — les sous-domaines du CDN varient (scontent-cdg4-1…).
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
  async redirects() {
    return LEGACY_REDIRECTS.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true, // 301 : transfère le jus SEO de l'ancienne URL
    }));
  },
  async headers() {
    // Content-Security-Policy volontairement conservatrice. `'unsafe-inline'`
    // sur script/style reste nécessaire tant qu'aucun nonce n'est posé par un
    // middleware : Next injecte du JS et des styles inline pour l'hydratation.
    // Les hôtes d'images distants (Google, Instagram) transitent par
    // /_next/image (donc `'self'`), mais on les liste pour tolérer un usage
    // direct. Pas de tiers en `connect-src` : le seul fetch client vise
    // /api/trial-booking, en same-origin.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://lh3.googleusercontent.com https://*.cdninstagram.com https://*.fbcdn.net",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          // 2 ans. Pas de `preload` volontairement : engagement permanent à ne
          // prendre qu'une fois le domaine et ses sous-domaines sûrs en HTTPS.
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
