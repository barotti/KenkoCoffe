import type { Metadata } from "next";
import { CaffeGlobe } from "@/components/CaffeGlobe";
import { AromaWheel } from "@/components/AromaWheel";
import "./caffe.css";

export const metadata: Metadata = {
  title: "Kenkō · Il caffè magico",
  description: "Blend selezionati dalle migliori piantagioni del mondo. Colombia, Brasile, Nicaragua, India e Sidamo in ogni tazza.",
};

export default function CaffePage() {
  return (
    <div className="caffe-page">

      {/* ── HERO ── */}
      <section className="cp-hero">
        <div className="cp-hero__content">
          <div className="cp-eyebrow">
            Il caffè magico <span>№ 002 — 2026</span>
          </div>
          <h1 className="cp-hero__title">
            Quattro continenti,<br />
            <em>una sola</em> tazza.
            <span className="cp-hero__sub">— Cinque origini, due blend, un rituale.</span>
          </h1>
          <p className="cp-hero__lede">
            Selezioniamo i chicchi di cinque regioni del mondo per comporre blend
            che raccontano la storia di ogni terra. La nostra ricerca attraversa
            Sud America, Africa orientale e l&apos;India per portare in tazza l&apos;essenza
            di culture diverse del caffè.
          </p>
          <div className="cp-stats">
            <div>
              <span className="cp-stat__num">05</span>
              <span className="cp-stat__label">Origini</span>
            </div>
            <div>
              <span className="cp-stat__num">02</span>
              <span className="cp-stat__label">Blend</span>
            </div>
            <div>
              <span className="cp-stat__num"><em>∞</em></span>
              <span className="cp-stat__label">Tazze</span>
            </div>
          </div>
        </div>
        <CaffeGlobe />
      </section>

      {/* ── BLENDS ── */}
      <section className="cp-section" id="blend">
        <header className="cp-section__head">
          <div className="cp-section__num">02 — I nostri blend</div>
          <h2 className="cp-section__title">Due composizioni, un&apos;unica <em>filosofia</em>.</h2>
        </header>

        <div className="cp-blends">
          <article className="cp-blend">
            <div className="cp-blend__decor">
              <strong>80/20</strong>Arabica · Robusta
            </div>
            <div className="cp-blend__tag">Blend Signature</div>
            <h3 className="cp-blend__name">Otto<em>venti</em><span className="cp-blend__pct">%</span></h3>
            <p className="cp-blend__sub">Quattro culture del caffè in ogni tazza.</p>
            <p className="cp-blend__desc">
              Il nostro Blend 80/20 nasce dall&apos;unione di quattro paesi —
              Colombia, Brasile, Nicaragua e India. Un equilibrio studiato tra
              rotondità latinoamericana e profondità asiatica: l&apos;80% di arabica
              seleziona il carattere, il 20% di robusta porta corpo e crema.
            </p>
            <div className="cp-blend__origins">
              {["Colombia","Brasile","Nicaragua","India"].map(c => (
                <span key={c} className="cp-chip">{c}</span>
              ))}
            </div>
            <dl className="cp-tasting">
              <dt>Profilo</dt><dd>Dolce e deciso</dd>
              <dt>Note</dt><dd>Cioccolato fondente</dd>
              <dt>Acidità</dt><dd>Moderata</dd>
              <dt>Retrogusto</dt><dd>Frutti rossi · sciroppo d&apos;acero</dd>
            </dl>
          </article>

          <article className="cp-blend">
            <div className="cp-blend__decor">
              <strong>100</strong>Pure Arabica
            </div>
            <div className="cp-blend__tag">Blend Pure</div>
            <h3 className="cp-blend__name">Cento<span className="cp-blend__pct">%</span></h3>
            <p className="cp-blend__sub">Tre culture del caffè in ogni tazza.</p>
            <p className="cp-blend__desc">
              Il nostro Blend 100% nasce dall&apos;unione di tre paesi — Colombia,
              Brasile e Sidamo. Una composizione di pura arabica che sposa
              l&apos;eredità sudamericana al cuore antico del caffè etiope: la
              regione di Sidamo, dove il caffè è nato.
            </p>
            <div className="cp-blend__origins">
              {["Colombia","Brasile","Sidamo"].map(c => (
                <span key={c} className="cp-chip">{c}</span>
              ))}
            </div>
            <dl className="cp-tasting">
              <dt>Profilo</dt><dd>Aromatico e raffinato</dd>
              <dt>Note</dt><dd>Fiori bianchi · cacao chiaro</dd>
              <dt>Acidità</dt><dd>Viva e brillante</dd>
              <dt>Retrogusto</dt><dd>Agrumi · miele millefiori</dd>
            </dl>
          </article>
        </div>
      </section>

      <AromaWheel />

    </div>
  );
}
