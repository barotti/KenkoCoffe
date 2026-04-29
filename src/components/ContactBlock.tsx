import { locations } from "@/data/locations";

export function ContactBlock() {
  return (
    <section className="contact-block">
      {locations.map((location) => (
        <article className="contact-card" key={location.id} id={location.id} data-reveal>
          <p className="eyebrow">Sede di</p>
          <h2>{location.name}</h2>
          <dl>
            <div>
              <dt>Indirizzo</dt>
              <dd>{location.address}</dd>
            </div>
            <div>
              <dt>Orari</dt>
              <dd>{location.hours}</dd>
            </div>
            <div>
              <dt>Telefono</dt>
              <dd>{location.phone}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{location.email}</dd>
            </div>
          </dl>
          <a className="arrow-link" href={location.mapUrl} target="_blank" rel="noreferrer">
            Indicazioni su Google Maps <span aria-hidden="true">→</span>
          </a>
        </article>
      ))}
    </section>
  );
}
