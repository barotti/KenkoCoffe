import type { Metadata } from "next";
import { CaffeGlobe } from "@/components/CaffeGlobe";
import "./caffe.css";

export const metadata: Metadata = {
  title: "Kenko · Il caffè magico",
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

      {/* ── ORIGINS ── */}
      <section className="cp-section cp-section--bordered" id="origini">
        <header className="cp-section__head">
          <div className="cp-section__num">01 — Le cinque origini</div>
          <h2 className="cp-section__title">Da dove viene la nostra <em>magia</em>.</h2>
        </header>

        <div className="cp-origins">
          {[
            { n:"01 / Sud America",    name:"Colombia",  region:"Andes Centrali",  coord:"04°34′ N · 74°17′ W", text:"Coltivazioni d'altura sulle pendici della Cordigliera. Climi miti e suoli vulcanici donano un caffè equilibrato, dolce, con la rotondità classica dell'arabica colombiana.", blends:["Blend 80/20","Blend 100%"] },
            { n:"02 / Sud America",    name:"Brasile",   region:"Cerrado Mineiro", coord:"14°14′ S · 51°55′ W", text:"Patria del caffè più consumato al mondo. Le piantagioni del Minas Gerais regalano corpo, dolcezza naturale e quella firma di cacao e nocciola che tiene insieme i nostri blend.", blends:["Blend 80/20","Blend 100%"] },
            { n:"03 / Centro America", name:"Nicaragua", region:"Jinotega",        coord:"12°51′ N · 85°12′ W", text:"Le montagne di Jinotega, ombreggiate dalla foresta tropicale, producono caffè con corpo pieno e una vibrante acidità. È qui che nasce la spinta fruttata del nostro 80/20.", blends:["Blend 80/20"] },
            { n:"04 / Asia",           name:"India",     region:"Karnataka",       coord:"12°58′ N · 77°35′ E", text:"Sui Western Ghats si coltiva una robusta dal carattere unico, meno amara, con sentori speziati. Porta al blend struttura e quella crema densa che firma l'espresso.", blends:["Blend 80/20"] },
            { n:"05 / Africa orientale",name:"Sidamo",   region:"Etiopia",         coord:"06°44′ N · 38°29′ E", text:"La culla del caffè. Negli altopiani del sud etiope, l'arabica cresce come pianta spontanea da secoli. Aroma floreale, agrumato, complesso — il cuore raffinato del Blend 100%.", blends:["Blend 100%"] },
          ].map(o => (
            <article key={o.name} className="cp-origin">
              <div className="cp-origin__num">{o.n}</div>
              <h3 className="cp-origin__name">{o.name}</h3>
              <div className="cp-origin__region">{o.region}</div>
              <div className="cp-origin__coord">{o.coord}</div>
              <p className="cp-origin__text">{o.text}</p>
              <div className="cp-origin__tags">
                {o.blends.map(b => <span key={b} className="cp-origin__tag">{b}</span>)}
              </div>
            </article>
          ))}
          <article className="cp-origin cp-origin--kenko">
            <div className="cp-origin__num">— Filosofia</div>
            <h3 className="cp-origin__name cp-origin__name--em">Kenko</h3>
            <div className="cp-origin__region">健康 · Salute, equilibrio</div>
            <div className="cp-origin__coord">— Una tazza alla volta</div>
            <p className="cp-origin__text">
              Ogni miscela è il risultato di tostature controllate, di
              proporzioni studiate, di rispetto per la materia prima.
              Cinque origini, due blend, un&apos;unica idea di caffè.
            </p>
          </article>
        </div>
      </section>

    </div>
  );
}
