export function ContactForm() {
  return (
    <form className="contact-form" action="#" method="post" data-reveal>
      <div className="field">
        <label htmlFor="name">Nome</label>
        <input id="name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="phone">Telefono opzionale</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="field">
        <label htmlFor="message">Messaggio</label>
        <textarea id="message" name="message" rows={5} required minLength={10} />
      </div>
      <label className="privacy-check">
        <input type="checkbox" name="privacy" required />
        <span>Ho letto l&apos;informativa privacy e acconsento al trattamento dei dati.</span>
      </label>
      <button type="submit">Invia messaggio</button>
    </form>
  );
}
