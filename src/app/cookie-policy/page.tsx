import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Kenkō Kohi",
  description: "Informativa sull'utilizzo dei cookie sul sito Kenkō Kohi.",
};

export default function CookiePolicyPage() {
  return (
    <section className="legal-page">
      <div className="legal-page__inner">
        <p className="eyebrow">Legale</p>
        <h1>Cookie Policy</h1>
        <p className="legal-page__intro">
          Questa pagina descrive come il sito utilizza i cookie e tecnologie
          simili ai sensi dell&apos;art. 122 del D.Lgs. 196/2003 e del
          Provvedimento del Garante dell&apos;8 maggio 2014.
        </p>

        <h2>Cosa sono i cookie</h2>
        <p>
          I cookie sono piccoli file di testo salvati nel tuo browser durante la
          navigazione. Possono essere di sessione (eliminati alla chiusura del
          browser) o persistenti (conservati per un periodo definito).
        </p>

        <h2>Cookie tecnici</h2>
        <p>
          Questo sito utilizza esclusivamente cookie tecnici necessari al
          funzionamento delle pagine. Non richiedono il tuo consenso e non
          raccolgono informazioni per finalità di profilazione.
        </p>

        <h2>Cookie di terze parti</h2>
        <p>
          Il sito può includere contenuti incorporati da terze parti (es. mappe
          Google). Questi servizi possono impostare propri cookie soggetti alle
          rispettive privacy policy.
        </p>

        <h2>Come disabilitare i cookie</h2>
        <p>
          Puoi gestire o disabilitare i cookie nelle impostazioni del tuo
          browser. Tieni presente che la disabilitazione dei cookie tecnici
          potrebbe compromettere il corretto funzionamento del sito.
        </p>

        <h2>Contatti</h2>
        <p>
          Per qualsiasi domanda scrivi a{" "}
          <a href="mailto:kenkokohi@gmail.com">kenkokohi@gmail.com</a>.
        </p>
      </div>
    </section>
  );
}
