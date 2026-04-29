import Link from "next/link";
import Image from "next/image";
import { navigation } from "@/data/navigation";

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Kenko Coffee home">
        <Image
          src="/images/home/LOGO.PNG"
          alt="Kenko Coffee"
          width={120}
          height={40}
          className="brand__logo"
          priority
        />
      </Link>
      <nav className="site-nav" aria-label="Navigazione principale">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className="header-cta" href="/contatti">
        Sedi
      </Link>
    </header>
  );
}
