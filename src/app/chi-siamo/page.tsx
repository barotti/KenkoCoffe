import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { InstagramEmbed } from "@/components/InstagramEmbed";
import { pagesSeo } from "@/data/seo";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(pagesSeo.about);

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-intro">
        <article className="about-copy" data-reveal>
          <p className="eyebrow">La nostra idea</p>
          <h2>Originalita, ricerca e rituale quotidiano.</h2>
          <div className="about-copy__text">
            <p>
              <strong className="brand-name">Kenkō</strong> nasce da un&apos;idea di Matteo Russo, con un obiettivo chiaro: portare a
              Guidonia un nuovo modo di vivere la caffetteria, fatto di qualita, ricerca e
              identita.
            </p>
            <p>
              Non un semplice bar, ma uno spazio in cui ogni dettaglio e pensato per offrire
              un&apos;esperienza coerente: dalla selezione delle miscele alla preparazione in tazza.
            </p>
            <p>
              Qui il caffe non e solo una pausa, ma un momento consapevole. Un gesto quotidiano
              che, se fatto bene, puo fare la differenza.
            </p>
          </div>
          <div className="about-stats" aria-label="Valori Kenkō Coffee">
            <span>Qualita</span>
            <span>Accoglienza</span>
            <span>Identita locale</span>
          </div>
        </article>

        <div className="about-media" data-reveal>
          <video src="/images/chi_siamo/chisiamo.MOV" autoPlay loop muted playsInline />
        </div>
      </section>

      <section className="about-locations">
        <div className="about-locations__inner">
          <div className="about-locations__media">
            <InstagramEmbed permalink="https://www.instagram.com/p/DEFJF5gsB0t/" />
          </div>
          <article className="about-locations__copy" data-reveal>
            <p className="eyebrow">Filosofia</p>
            <h2>La nostra filosofia</h2>
            <p>
              Crediamo nella qualità come punto di partenza, non come optional.
              Per questo selezioniamo con cura ogni prodotto, lavorando solo con materie prime che rispettano i nostri standard.

              Ogni giorno lavoriamo per offrire qualcosa di semplice, ma fatto nel modo giusto:
              un espresso equilibrato, una colazione curata, un ambiente accogliente ma essenziale.

              <strong className="brand-name">Kenkō</strong> è attenzione, costanza e rispetto per chi sceglie di fermarsi.
              OGGI

              Oggi <strong className="brand-name">Kenkō</strong> è un punto di riferimento per chi cerca una caffetteria diversa,
              capace di unire gusto, atmosfera e identità.

              Un luogo pensato per chi non si accontenta.
              Per chi cerca qualità, anche nelle cose più semplici.
            </p>
            <div className="about-location-tags" aria-label="Sedi Kenkō Coffee">
              <span>Guidonia Montecelio</span>
              <span>Tagliacozzo</span>
            </div>
            <Button href="/contatti">Vedi contatti</Button>
          </article>
        </div>
      </section>

      <section className="about-values">
        <div className="about-values__header" data-reveal>
          <p className="eyebrow">Qualita</p>
          <h2>Il nostro approccio</h2>
          <p>
            Per noi la qualità non è un’aggiunta, è il punto di partenza.
            Ogni scelta viene fatta con attenzione, dalla selezione delle materie prime fino alla preparazione in tazza.

            Lavoriamo su ciò che conta davvero: equilibrio, costanza e cura del dettaglio.
            Senza forzature, senza eccessi.

            <strong className="brand-name">Kenkō</strong> è questo: fare le cose semplici, ma farle nel modo giusto.
            Ogni giorno.
          </p>
        </div>

        <div className="about-values__grid">
          <article data-reveal>
            <span>01</span>
            <h3>Materia prima</h3>
            <p>Scelte precise, miscele curate e attenzione costante alla resa in tazza.</p>
          </article>
          <article data-reveal>
            <span>02</span>
            <h3>Servizio</h3>
            <p>Un banco ordinato, tempi giusti e un modo di accogliere semplice, diretto, umano.</p>
          </article>
          <article data-reveal>
            <span>03</span>
            <h3>Territorio</h3>
            <p>Due luoghi diversi, una presenza riconoscibile e legata alla vita quotidiana locale.</p>
          </article>
        </div>
      </section>
    </div>
  );
}
