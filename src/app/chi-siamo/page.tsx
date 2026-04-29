import type { Metadata } from "next";
import { Button } from "@/components/Button";
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
          <h2>La nostra idea di caffetteria</h2>
          <p>
            Crediamo in una caffetteria concreta: qualità nella tazza, attenzione al servizio,
            tempi giusti e spazi pensati per iniziare la giornata o prendersi una pausa.
          </p>
        </article>
        <div className="detail-photo detail-photo--cups" aria-label="Tazze e dettagli del banco caffetteria" />
      </section>

      <section className="story-grid story-grid--reverse">
        <div className="detail-photo detail-photo--bar" aria-label="Banco caffetteria con caffè servito" />
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
