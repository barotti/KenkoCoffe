import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocationById, locationGalleries, locations } from "@/data/locations";
import { siteSeo } from "@/data/seo";

type LocationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return locations.map((location) => ({
    id: location.id,
  }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { id } = await params;
  const location = getLocationById(id);

  if (!location) {
    return {};
  }

  const title = `${location.name} | Gallery Kenko Kohi`;
  const description = `Gallery fotografica e video della sede Kenko Kohi di ${location.name}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteSeo.baseUrl}${location.href}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteSeo.baseUrl}${location.href}`,
      siteName: siteSeo.siteName,
      images: [
        {
          url: `${siteSeo.baseUrl}${location.image}`,
          width: 1200,
          height: 800,
          alt: location.imageAlt,
        },
      ],
      locale: siteSeo.locale,
      type: "website",
    },
  };
}

export default async function LocationGalleryPage({ params }: LocationPageProps) {
  const { id } = await params;
  const location = getLocationById(id);

  if (!location) {
    notFound();
  }

  const gallery = locationGalleries[location.id];
  const isSingle = gallery.length === 1;

  return (
    <section className="gallery-page">
      <header className="gallery-header" data-reveal>
        <p className="eyebrow">Gallery</p>
        <h1>{location.name}</h1>
        <p className="gallery-header__meta">{location.region} — Kenko Kohi</p>
      </header>

      <hr className="gallery-divider" />

      <div className={`media-gallery${isSingle ? " media-gallery--single" : ""}`}>
        {gallery.map((item, index) => (
          <figure
            className={`media-gallery__item${isSingle ? " media-gallery__item--featured" : ""}`}
            key={`${item.src}-${index}`}
            data-reveal
          >
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={item.alt ?? `Gallery ${location.name}`}
                width={item.width ?? 1600}
                height={item.height ?? 1000}
                sizes={isSingle ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                priority={index === 0}
              />
            ) : (
              <video controls playsInline preload="metadata" poster={item.poster}>
                <source src={item.src} />
              </video>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
