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
          <Image
            src="/images/home/_DSC7150.JPG"
            alt="Kenkō Coffee"
            fill
            className="hero__img"
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
        </div>
        <div className="hero__content">
          <div data-hero-reveal>
            <Image
              src="/images/home/LOGONUOVO.svg"
              alt="Kenkō Coffee"
              width={800}
              height={800}
              className="hero__logo"
              priority
            />
          </div>
          <div className="hero__actions" data-hero-reveal>
            <Button href="/contatti">Prenota ora</Button>
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
            alt="Kenkō Coffee"
            width={180}
            height={60}
            className="editorial-logo"
          />
        </div>
        <div className="idea-card" data-reveal>
          <p>
            <strong className="brand-name">Kenkō</strong> nasce per dare al rito del caffè un luogo curato e familiare: materia
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
        <h2>Scegli la sede più vicina e raggiungici.</h2>
        <Button href="/contatti">Contatti e indicazioni</Button>
      </section>
    </>
  );
}
