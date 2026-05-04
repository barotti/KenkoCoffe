import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Kenkō Kohi",
  description: "Informativa sul trattamento dei dati personali di Kenkō Kohi.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="legal-page">
      <div className="legal-page__inner">
        <p className="eyebrow">Legale</p>
        <h1>Privacy Policy</h1>
        <p className="legal-page__intro">
          Ai sensi del Regolamento UE 2016/679 (GDPR) e del D.Lgs. 196/2003, ti
          forniamo le seguenti informazioni sul trattamento dei tuoi dati personali.
        </p>

        <h2>Titolare del trattamento</h2>
        <p>
          Kenkō Kohi<br />
          Viale Roma, 118, 00012 Guidonia Montecelio RM<br />
          Email: <a href="mailto:kenkokohi@gmail.com">kenkokohi@gmail.com</a>
        </p>

        <h2>Dati raccolti</h2>
        <p>
          Il sito raccoglie esclusivamente i dati che fornisci volontariamente
          attraverso il modulo di contatto (nome, indirizzo email, messaggio) e i
          dati di navigazione raccolti tramite cookie tecnici.
        </p>

        <h2>Finalità e base giuridica</h2>
        <p>
          I dati vengono trattati per rispondere alle tue richieste di contatto
          (base giuridica: consenso) e per garantire il corretto funzionamento
          del sito (base giuridica: legittimo interesse).
        </p>

        <h2>Conservazione</h2>
        <p>
          I dati di contatto vengono conservati per il tempo strettamente
          necessario a gestire la comunicazione e, successivamente, eliminati.
        </p>

        <h2>Diritti dell'interessato</h2>
        <p>
          Hai il diritto di accedere, rettificare, cancellare o limitare il
          trattamento dei tuoi dati. Per esercitare i tuoi diritti scrivi a{" "}
          <a href="mailto:kenkokohi@gmail.com">kenkokohi@gmail.com</a>.
        </p>
      </div>
    </section>
  );
}
