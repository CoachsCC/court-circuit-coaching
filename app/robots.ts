import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // La page mentions légales est en noindex : inutile de la faire crawler.
      disallow: "/mentions-legales",
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
