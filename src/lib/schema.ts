import { locations } from "@/data/locations";
import { siteSeo } from "@/data/seo";

export function getCafeSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${siteSeo.baseUrl}/#business`,
    name: siteSeo.siteName,
    url: `${siteSeo.baseUrl}/`,
    image: `${siteSeo.baseUrl}${siteSeo.defaultOgImage}`,
    servesCuisine: ["Caffè", "Colazione", "Caffetteria"],
    priceRange: "€€",
    areaServed: locations.map((location) => location.name),
    department: locations.map((location) => ({
      "@type": "CafeOrCoffeeShop",
      "@id": `${siteSeo.baseUrl}/#${location.id}`,
      name: `${siteSeo.siteName} - ${location.name}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: location.address,
        addressLocality: location.name,
        addressRegion: location.region,
        addressCountry: "IT",
      },
      telephone: location.phone,
      openingHours: location.hours,
    })),
  };
}
