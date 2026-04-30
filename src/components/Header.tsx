"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { navigation } from "@/data/navigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`site-header${isMenuOpen ? " site-header--open" : ""}`}>
      <Link className="brand" href="/" aria-label="Kenko Coffee home" onClick={closeMenu}>
        <Image
          src="/images/home/LOGO.PNG"
          alt="Kenko Coffee"
          width={120}
          height={40}
          className="brand__logo"
          priority
        />
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
        aria-expanded={isMenuOpen}
        aria-controls="site-menu"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className="site-nav" id="site-menu" aria-label="Navigazione principale">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className="header-cta" href="/contatti" onClick={closeMenu}>
        Sedi
      </Link>
    </header>
  );
}
