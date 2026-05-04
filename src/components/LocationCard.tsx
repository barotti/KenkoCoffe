import Image from "next/image";
import Link from "next/link";
import type { Location } from "@/data/locations";

type LocationCardProps = {
  location: Location;
  headingLevel?: "h2" | "h3";
};

export function LocationCard({ location, headingLevel = "h3" }: LocationCardProps) {
  const Heading = headingLevel;

  return (
    <article className="location-card" data-reveal>
      <Link href={location.href} className="location-card__link" aria-label={`Apri la gallery della sede di ${location.name}`}>
        <Image
          src={location.image}
          alt={location.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="location-card__image"
        />
        <div className="location-card__overlay" />
        <div className="location-card__content">
          <p>{location.region}</p>
          <Heading>{location.name}</Heading>
          <p className="location-card__address">{location.address}</p>
          <span className="arrow-link">
            Scopri la sede <span aria-hidden="true">-&gt;</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
