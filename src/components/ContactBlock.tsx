import { locations } from "@/data/locations";

const locationMeta = {
  "guidonia-montecelio": {
    index: "01",
    coordinates: "41.99 N / 12.72 E",
  },
  tagliacozzo: {
    index: "02",
    coordinates: "42.07 N / 13.25 E",
  },
};

export function ContactBlock() {
  return (
    <section className="contact-block">
      {locations.map((location) => {
        const meta = locationMeta[location.id];

        return (
          <article className="contact-card" key={location.id} id={location.id} data-reveal>
            <div className="contact-card__topline">
              <span>{meta.index}</span>
              <span>{location.region}</span>
            </div>
            <p className="eyebrow">Sede di</p>
            <h2>{location.name}</h2>
            <p className="contact-card__coords">{meta.coordinates}</p>
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
              Indicazioni su Google Maps <span aria-hidden="true">-&gt;</span>
            </a>
          </article>
        );
      })}
    </section>
  );
}
