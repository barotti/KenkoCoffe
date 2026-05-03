import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { InstagramEmbed } from "@/components/InstagramEmbed";
import { PageHeader } from "@/components/PageHeader";
import { pagesSeo } from "@/data/seo";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(pagesSeo.about);

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Chi siamo"
        title="Una cura quotidiana, tra banco e territorio."
        text="Kenko Coffee unisce due sedi e una stessa idea: far sentire ogni persona accolta, con caffè ben preparati e un ambiente riconoscibile."
      />

      <section className="story-grid">
        <article data-reveal>
          <h2>La nostra idea di originalita&apos;</h2>
          <p>
            Kenko nasce da un’idea di Matteo Russo, con un obiettivo chiaro:
portare a Guidonia un nuovo modo di vivere la caffetteria, fatto di qualità, ricerca e identità.

Non un semplice bar, ma uno spazio in cui ogni dettaglio è pensato per offrire un’esperienza coerente.
Dalla selezione delle miscele alla preparazione in tazza, ogni scelta nasce dalla volontà di valorizzare il caffè come prodotto, rispettandone origine, caratteristiche e lavorazione.

Kenko è il risultato di un percorso costruito nel tempo, fatto di studio, attenzione e visione.
Un luogo dove la tradizione incontra un approccio più contemporaneo, senza perdere autenticità.

Qui il caffè non è solo una pausa, ma un momento consapevole.
Un gesto quotidiano che, se fatto bene, può fare la differenza.
          </p>
        </article>
        <video
          className="detail-photo"
          src="/images/chi_siamo/chisiamo.MOV"
          autoPlay
          loop
          muted
          playsInline
          style={{ objectFit: "cover", width: "100%" }}
        />
      </section>

      <section className="story-grid story-grid--reverse">
        <InstagramEmbed permalink="https://www.instagram.com/p/DEFJF5gsB0t/" />
        <article data-reveal>
          <h2>Due sedi, una stessa cura</h2>
          <p>
            Guidonia Montecelio e Tagliacozzo hanno ritmi e identità diverse. In entrambe le sedi
            portiamo la stessa attenzione: accoglienza, pulizia visiva, proposta chiara e qualità
            costante.
          </p>
        </article>
      </section>

      <section className="values-section">
        <div data-reveal>
          <h2>Qualità, accoglienza e territorio</h2>
          <p>
            Il valore non sta solo nel prodotto, ma nel modo in cui viene servito: una parola al
            momento giusto, un cappuccino fatto bene, un ambiente che invita a tornare.
          </p>
          <Button href="/contatti">Scopri le sedi</Button>
        </div>
      </section>
    </>
  );
}
