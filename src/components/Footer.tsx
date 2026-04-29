import Link from "next/link";
import { locations } from "@/data/locations";
import { navigation } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="brand brand--footer" href="/">
          <span className="brand__mark">K</span>
          <span>Kenko Coffee</span>
        </Link>
        <p>Caffè, colazioni e pause curate tra Guidonia Montecelio e Tagliacozzo.</p>
      </div>
      <div className="footer-grid">
        <div>
          <h2>Menu</h2>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <h2>Sedi</h2>
          {locations.map((location) => (
            <a key={location.id} href={location.mapUrl} target="_blank" rel="noreferrer">
              {location.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
