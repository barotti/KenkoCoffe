import Link from "next/link";
import Image from "next/image";
import { locations } from "@/data/locations";
import { navigation } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link className="brand brand--footer" href="/">
            <Image src="/images/home/LOGO.PNG" alt="Kenkō" width={34} height={34} style={{ objectFit: "contain" }} />
            <span>Kenkō Kohi</span>
          </Link>
          <p>Caffetteria artigianale.<br />Guidonia & Tagliacozzo.</p>
        </div>
        <div className="footer-grid">
          <div>
            <h2>Menu</h2>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
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
          <div>
            <h2>Contatti</h2>
            <a href="mailto:kenkokohi@gmail.com">kenkokohi@gmail.com</a>
            <a href="https://wa.me/393271587476" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Kenkō Kohi. Tutti i diritti riservati.</p>
        <div className="footer-legal">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/cookie-policy">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}
