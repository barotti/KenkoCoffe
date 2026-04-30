import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { LocationsBlock } from "@/components/LocationsBlock";
import { InstagramFeed } from "@/components/InstagramFeed";
import { GoogleReviews } from "@/components/GoogleReviews";
import { ExperienceSlider } from "@/components/ExperienceSlider";
import { pagesSeo } from "@/data/seo";
import { createMetadata } from "@/lib/metadata";
import { getCafeSchema } from "@/lib/schema";

export const metadata: Metadata = createMetadata(pagesSeo.home);

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getCafeSchema()) }}
      />
      <section className="hero">
        <div className="hero__media" data-parallax>
          <video
            className="hero__video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/images/home/kenko.mov" type="video/mp4" />
          </video>
        </div>
        <div className="hero__content">
          <p className="eyebrow" data-hero-reveal>
            Guidonia Montecelio / Tagliacozzo
          </p>
          <h1 data-hero-reveal>Kenko Kohi</h1>
          <p data-hero-reveal>
            Caffe preparati con attenzione, colazioni fragranti e un&apos;accoglienza concreta,
            pensata per accompagnare bene ogni momento della giornata.
          </p>
          <div className="hero__actions" data-hero-reveal>
            <Button href="/contatti">Le Nostre Sedi</Button>
            <Button href="/chi-siamo" variant="light">
              Chi siamo
            </Button>
          </div>
        </div>
      </section>

      <section className="editorial split-section">
        <div data-reveal>
          <p className="eyebrow">La nostra idea</p>
          <h2>Una caffetteria locale.</h2>
          <Image
            src="/images/home/LOGO.PNG"
            alt="Kenko Coffee"
            width={180}
            height={60}
            className="editorial-logo"
          />
        </div>
        <div className="idea-card" data-reveal>
          <p>
            Kenko Coffee nasce per dare al rito del caffe un luogo curato e familiare: materia
            prima selezionata, servizio presente, ambienti caldi e una proposta pensata per
            colazione, pausa e incontro.
          </p>
          <Link className="arrow-link" href="/chi-siamo">
            Scopri la filosofia <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </section>

      <ExperienceSlider />

      <section className="parallax-banner">
        <div className="parallax-banner__content">
          <p className="parallax-banner__eyebrow">La nostra selezione</p>
          <h2 className="parallax-banner__title">I Nostri Caffè</h2>
          <p className="parallax-banner__text">
            Cinque origini, due blend, una sola filosofia. Abbiamo selezionato
            i migliori chicchi dal mondo per portarti il carattere di ogni
            piantagione direttamente in tazza.
          </p>
          <Button href="/caffe" variant="light">Scopri i blend</Button>
        </div>
      </section>

      <GoogleReviews />

      <InstagramFeed />

      <LocationsBlock />

      <section className="final-cta">
        <p className="eyebrow">Vieni a trovarci</p>
        <h2>Scegli la sede piu vicina e raggiungici.</h2>
        <Button href="/contatti">Contatti e indicazioni</Button>
      </section>
    </>
  );
}
