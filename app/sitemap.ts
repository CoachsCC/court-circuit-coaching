import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Routes indexables du site. `/mentions-legales` est volontairement exclu : la
 * page porte `robots: { index: false }`, l'inscrire au sitemap serait
 * contradictoire.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: { path: string; priority: number }[] = [
    { path: "/", priority: 1.0 },
    { path: "/cross-training", priority: 0.9 },
    { path: "/cardio-boxing", priority: 0.9 },
    { path: "/tarifs", priority: 0.8 },
    { path: "/seance-essai", priority: 0.8 },
    { path: "/la-salle", priority: 0.7 },
  ];

  return entries.map(({ path, priority }) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
