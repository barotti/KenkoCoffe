import type { Metadata } from "next";
import { siteSeo } from "@/data/seo";

type PageSeo = {
  path: string;
  title: string;
  description: string;
};

export function createMetadata(page: PageSeo): Metadata {
  const url = `${siteSeo.baseUrl}${page.path}`;
  const imageUrl = `${siteSeo.baseUrl}${siteSeo.defaultOgImage}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: siteSeo.siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Interno della caffetteria con banco e caffè servito",
        },
      ],
      locale: siteSeo.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [imageUrl],
    },
  };
}
