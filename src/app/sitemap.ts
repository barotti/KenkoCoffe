import type { MetadataRoute } from "next";
import { locations } from "@/data/locations";
import { pagesSeo, siteSeo } from "@/data/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteSeo.baseUrl}${pagesSeo.home.path}`,
      lastModified: new Date("2026-04-28"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteSeo.baseUrl}${pagesSeo.about.path}`,
      lastModified: new Date("2026-04-28"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteSeo.baseUrl}${pagesSeo.contacts.path}`,
      lastModified: new Date("2026-04-28"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...locations.map((location) => ({
      url: `${siteSeo.baseUrl}${location.href}`,
      lastModified: new Date("2026-04-28"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
