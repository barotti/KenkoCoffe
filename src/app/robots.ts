import type { MetadataRoute } from "next";
import { siteSeo } from "@/data/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteSeo.baseUrl}/sitemap.xml`,
  };
}
