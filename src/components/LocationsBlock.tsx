import Link from "next/link";
import { locations } from "@/data/locations";
import { LocationCard } from "@/components/LocationCard";

export function LocationsBlock() {
  return (
    <section className="locations-block" id="sedi">
      <div className="section-heading section-heading--dark">
        <div>
          <p className="eyebrow">Le nostre sedi</p>
          <h2>Due caffetterie, la stessa cura al banco.</h2>
        </div>
        <Link href="/contatti">Vedi contatti</Link>
      </div>
      <div className="locations-grid">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </section>
  );
}
