import type { Metadata } from "next";
import { ContactBlock } from "@/components/ContactBlock";
import { PageHeader } from "@/components/PageHeader";
import { pagesSeo } from "@/data/seo";
import { createMetadata } from "@/lib/metadata";
import { getCafeSchema } from "@/lib/schema";

export const metadata: Metadata = createMetadata(pagesSeo.contacts);

export default function ContactsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getCafeSchema()) }}
      />
      <PageHeader
        eyebrow="Contatti"
        title="Contatti e sedi"
        text="Trova indirizzi, orari e indicazioni per Guidonia Montecelio e Tagliacozzo. I dati definitivi verranno aggiornati prima del deploy."
      />
      <ContactBlock />
      <section className="contact-actions" aria-labelledby="contact-actions-title">
        <header className="contact-actions__head">
          <p className="eyebrow">Opportunità</p>
          <h2 id="contact-actions-title">Sei in cerca di una nuova sfida?</h2>
        </header>
        <div className="contact-actions__grid">
          <article className="contact-action contact-action--dark" data-reveal>
            <h3>Lavora con noi</h3>
            <p>
              Cerchiamo persone attente, sorridenti e curiose: se ami il rito del caffè
              e il lavoro di sala, raccontaci chi sei.
            </p>
            <a href="mailto:?subject=Candidatura%20Kenk%C5%8D%20Kohi">
              Contattaci
            </a>
          </article>
          <article className="contact-action contact-action--green" data-reveal>
            <h3>Sei un fornitore?</h3>
            <p>
              Prodotti, materie prime, servizi o collaborazioni locali: siamo aperti a
              proposte coerenti con la qualità <strong className="brand-name">Kenkō</strong>.
            </p>
            <a href="mailto:?subject=Proposta%20fornitore%20Kenk%C5%8D%20Kohi">
              Presentati
            </a>
          </article>
        </div>
      </section>
    </>
  );
}
