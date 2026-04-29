import type { Metadata } from "next";
import { ContactBlock } from "@/components/ContactBlock";
import { ContactForm } from "@/components/ContactForm";
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
      <section className="form-section">
        <div>
          <p className="eyebrow">Scrivici</p>
          <h2>Una richiesta, una prenotazione o un&apos;informazione.</h2>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
