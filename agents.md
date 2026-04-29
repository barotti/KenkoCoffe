# AGENTS.md - Progetto sito web caffetteria

## Obiettivo
Realizzare un sito vetrina premium per una caffetteria con due sedi:
- Guidonia Montecelio
- Tagliacozzo

Il sito deve comunicare qualità, accoglienza, cura del caffè e identità locale. Il riferimento estetico è il sito Onyx Coffee Lab: layout editoriale, fotografia grande, sezioni scure, microinterazioni curate. Non copiare asset, testi o layout proprietari: usare il riferimento solo come direzione visiva.

## Pagine richieste
1. `Home`
2. `Chi siamo`
3. `Contatti`

URL pubblici:
- `/`
- `/chi-siamo`
- `/contatti`

## Font
Font principale richiesto: **Futura**.

CSS consigliato:

```css
:root {
  --font-main: "Futura PT", "Futura", "Avenir Next", "Montserrat", Arial, sans-serif;
}
```

Nota: non includere file font senza licenza. Se il cliente fornisce un file Futura licenziato, caricarlo in `/public/fonts/` e usare `@font-face`.

## Palette
Usare una palette derivata dalle immagini di riferimento:

```css
:root {
  --color-green: #0B6B37;
  --color-black: #0D0D0D;
  --color-charcoal: #262626;
  --color-stone: #73736F;
  --color-light-stone: #D8D7CF;
  --color-ivory: #F6F4EC;
  --color-white: #FFFFFF;
  --color-coffee: #6B3F2A;
}
```

Linee guida colore:
- Sfondo principale: bianco o avorio.
- Sezioni premium: charcoal/nero.
- CTA, underline, icone e focus state: verde brand.
- Testi lunghi: nero/charcoal, non grigio troppo chiaro.

## Struttura consigliata

```txt
src/
  app/ oppure pages/
  components/
    Header.tsx
    Footer.tsx
    Button.tsx
    Section.tsx
    PageHeader.tsx
    LocationCard.tsx
    LocationsBlock.tsx
    ContactBlock.tsx
    Reveal.tsx
  data/
    locations.ts
    navigation.ts
    seo.ts
  styles/
    globals.css
    tokens.css
  lib/
    gsap.ts
    schema.ts
public/
  robots.txt
  sitemap.xml
  images/
    og/
    sedi/
```

## Dati sedi
Creare un file dati unico, per esempio `src/data/locations.ts`:

```ts
export const locations = [
  {
    id: "guidonia-montecelio",
    name: "Guidonia Montecelio",
    address: "Indirizzo da confermare",
    phone: "Telefono da confermare",
    hours: "Orari da confermare",
    mapUrl: "Link Google Maps da confermare",
    image: "/images/sedi/guidonia.jpg",
  },
  {
    id: "tagliacozzo",
    name: "Tagliacozzo",
    address: "Indirizzo da confermare",
    phone: "Telefono da confermare",
    hours: "Orari da confermare",
    mapUrl: "Link Google Maps da confermare",
    image: "/images/sedi/tagliacozzo.jpg",
  },
];
```

## Home page
Sezioni richieste:
1. Hero fotografico con headline, sottotitolo e CTA verso le sedi.
2. Intro editoriale breve sulla caffetteria.
3. Blocco `Le nostre sedi` con **due card**, una per Guidonia Montecelio e una per Tagliacozzo, ispirate alla seconda immagine fornita.
4. Sezione esperienza: caffè, colazione, pausa, atmosfera.
5. CTA finale verso Contatti o indicazioni stradali.

## Blocco sedi
Il blocco sedi deve avere:
- Sfondo scuro (`--color-charcoal` o `--color-black`).
- Titolo in alto a sinistra.
- Link piccolo in alto a destra, per esempio `Vedi contatti`.
- Due card fotografiche affiancate su desktop.
- Card in colonna su mobile.
- Overlay scuro sull'immagine per leggibilità.
- Nome sede, indirizzo breve e CTA `Scopri la sede` oppure `Indicazioni`.

Comportamento hover:
- Leggero zoom immagine: `scale(1.03)`.
- Overlay più intenso.
- Freccia CTA che si sposta di 6px verso destra.

## Chi siamo
Contenuti richiesti:
- Storia della caffetteria.
- Filosofia: qualità, accoglienza, cura della materia prima.
- Collegamento alle due sedi e al territorio.
- Foto di dettagli: banco, tazze, caffè, interni, staff.

Tono: elegante, concreto, locale. Evitare testi generici o troppo lunghi.

## Contatti
Contenuti richiesti:
- Card per Guidonia Montecelio.
- Card per Tagliacozzo.
- Indirizzo completo per ogni sede.
- Orari per ogni sede.
- Telefono, email e WhatsApp se disponibili.
- Link Google Maps per ogni sede.
- Form contatti con validazione.

Campi form consigliati:
- Nome
- Email
- Telefono opzionale
- Messaggio
- Checkbox privacy

## Animazioni GSAP
Usare **GSAP** come framework per le animazioni. Plugin consigliato: `ScrollTrigger`.

Regole:
- Animazioni sobrie e premium.
- Non animare elementi essenziali in modo da ritardare la lettura.
- Rispettare `prefers-reduced-motion`.
- Evitare animazioni pesanti su mobile.
- Caricare GSAP solo lato client e solo dove serve.
- Importare solo i plugin necessari per evitare bundle inutili.

Esempio:

```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initReveals() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  gsap.from("[data-reveal]", {
    opacity: 0,
    y: 24,
    duration: 0.8,
    stagger: 0.08,
    ease: "power3.out",
  });

  gsap.to("[data-parallax]", {
    yPercent: -8,
    ease: "none",
    scrollTrigger: {
      trigger: "[data-parallax]",
      scrub: true,
    },
  });
}
```

## Accessibilità
- Tutti i link e bottoni devono essere navigabili da tastiera.
- Focus state visibile, preferibilmente verde brand.
- Alt text descrittivi per tutte le immagini.
- Contrasto leggibile su sfondi scuri.
- Form con label reali, non solo placeholder.
- CTA con testo chiaro, non solo `clicca qui`.

---

# Gestione SEO e ottimizzazione

## Obiettivo SEO
Il sito deve essere ottimizzato per ricerche locali legate a caffetteria, caffè, colazione e punti vendita a Guidonia Montecelio e Tagliacozzo. L'obiettivo è rendere il sito chiaro per utenti e motori di ricerca, con URL puliti, contenuti localizzati, dati strutturati, performance elevate e una sitemap completa.

## Strategia SEO locale
Implementare:
- Title e meta description unici per ogni pagina.
- Un solo `h1` per pagina.
- Struttura heading ordinata: `h1`, `h2`, `h3`.
- URL leggibili: `/`, `/chi-siamo`, `/contatti`.
- Canonical URL per ogni pagina.
- Open Graph e Twitter/X Card per condivisioni social.
- Schema.org `CafeOrCoffeeShop` per la caffetteria e per le due sedi.
- Dati NAP coerenti: Name, Address, Phone uguali su sito, Google Business Profile e directory locali.
- Link interni chiari tra Home, Chi siamo e Contatti.
- Sitemap XML e robots.txt pubblici.
- Pagina Contatti ottimizzata per le due sedi con indirizzo, telefono, orari, mappa e CTA.

Keyword principali:
- caffetteria Guidonia Montecelio
- caffetteria Tagliacozzo
- caffè Guidonia Montecelio
- caffè Tagliacozzo
- colazione Guidonia Montecelio
- colazione Tagliacozzo

Keyword secondarie:
- bar caffetteria Guidonia Montecelio
- bar caffetteria Tagliacozzo
- pausa caffè Guidonia Montecelio
- pausa caffè Tagliacozzo
- cappuccino Guidonia Montecelio
- cappuccino Tagliacozzo
- caffetteria artigianale Guidonia Montecelio
- caffetteria artigianale Tagliacozzo

## Sitemap completa del sito
La sitemap completa, per lo scope attuale del progetto, include tre URL pubblici.

```txt
/
/chi-siamo
/contatti
```

Non inserire nella sitemap:
- URL con query string.
- URL con hash/ancore, per esempio `/contatti#guidonia-montecelio`.
- Pagine duplicate.
- Pagine di staging o test.
- Asset come immagini, CSS o JavaScript.

Se in futuro il cliente approva pagine dedicate alle singole sedi, aggiungere:

```txt
/sedi/guidonia-montecelio
/sedi/tagliacozzo
```

Queste due pagine non sono incluse nello scope iniziale perché le pagine richieste sono Home, Chi siamo e Contatti.

## Sitemap XML
Sostituire `https://www.nome-caffetteria.it` con il dominio reale prima del deploy.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.nome-caffetteria.it/</loc>
    <lastmod>2026-04-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.nome-caffetteria.it/chi-siamo</loc>
    <lastmod>2026-04-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.nome-caffetteria.it/contatti</loc>
    <lastmod>2026-04-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

File da creare:

```txt
public/sitemap.xml
```

## Sitemap dinamica per Next.js App Router
Se il progetto usa Next.js App Router, creare `src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";

const baseUrl = "https://www.nome-caffetteria.it";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-04-28"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/chi-siamo`,
      lastModified: new Date("2026-04-28"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contatti`,
      lastModified: new Date("2026-04-28"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
```

Aggiornare `lastModified` quando si modificano i contenuti principali.

## Robots.txt
Creare `public/robots.txt`:

```txt
User-agent: *
Allow: /

Sitemap: https://www.nome-caffetteria.it/sitemap.xml
```

Regole:
- In produzione il sito deve essere indicizzabile.
- In staging usare `noindex` o protezione con password, non bloccare accidentalmente la produzione.
- Prima del deploy verificare che `robots.txt` punti alla sitemap del dominio reale.

## Meta tag per pagina
Usare dati centralizzati, per esempio `src/data/seo.ts`.

```ts
export const siteSeo = {
  siteName: "Nome Caffetteria",
  baseUrl: "https://www.nome-caffetteria.it",
  defaultOgImage: "/images/og/default.jpg",
  locale: "it_IT",
};

export const pagesSeo = {
  home: {
    path: "/",
    title: "Caffetteria a Guidonia Montecelio e Tagliacozzo | Nome Caffetteria",
    description:
      "Caffetteria con sedi a Guidonia Montecelio e Tagliacozzo. Caffè, colazioni e pause di qualità in un ambiente curato e accogliente.",
  },
  about: {
    path: "/chi-siamo",
    title: "Chi siamo | Nome Caffetteria",
    description:
      "Scopri la storia, la filosofia e la cura per il caffè di Nome Caffetteria, presente a Guidonia Montecelio e Tagliacozzo.",
  },
  contacts: {
    path: "/contatti",
    title: "Contatti e sedi | Nome Caffetteria",
    description:
      "Trova indirizzi, orari, telefono e indicazioni per le sedi di Nome Caffetteria a Guidonia Montecelio e Tagliacozzo.",
  },
};
```

Requisiti title:
- Lunghezza consigliata: circa 45-60 caratteri quando possibile.
- Inserire il brand e la località solo dove utile.
- Evitare keyword stuffing.

Requisiti meta description:
- Lunghezza consigliata: circa 140-160 caratteri quando possibile.
- Deve spiegare il valore della pagina e contenere una CTA implicita o esplicita.
- Deve essere unica per ogni pagina.

## Metadata Next.js consigliati
Esempio per una pagina:

```ts
import type { Metadata } from "next";
import { siteSeo, pagesSeo } from "@/data/seo";

export const metadata: Metadata = {
  title: pagesSeo.home.title,
  description: pagesSeo.home.description,
  alternates: {
    canonical: `${siteSeo.baseUrl}${pagesSeo.home.path}`,
  },
  openGraph: {
    title: pagesSeo.home.title,
    description: pagesSeo.home.description,
    url: `${siteSeo.baseUrl}${pagesSeo.home.path}`,
    siteName: siteSeo.siteName,
    images: [
      {
        url: `${siteSeo.baseUrl}${siteSeo.defaultOgImage}`,
        width: 1200,
        height: 630,
        alt: "Interno della caffetteria con banco e caffè servito",
      },
    ],
    locale: siteSeo.locale,
    type: "website",
  },
};
```

## Schema.org LocalBusiness / CafeOrCoffeeShop
Implementare dati strutturati JSON-LD nella Home e nella pagina Contatti. Usare dati reali prima del deploy.

```ts
export function getCafeSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": "https://www.nome-caffetteria.it/#business",
    name: "Nome Caffetteria",
    url: "https://www.nome-caffetteria.it/",
    image: "https://www.nome-caffetteria.it/images/og/default.jpg",
    servesCuisine: ["Caffè", "Colazione", "Caffetteria"],
    priceRange: "€€",
    areaServed: ["Guidonia Montecelio", "Tagliacozzo"],
    department: [
      {
        "@type": "CafeOrCoffeeShop",
        "@id": "https://www.nome-caffetteria.it/#guidonia-montecelio",
        name: "Nome Caffetteria - Guidonia Montecelio",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Indirizzo da confermare",
          addressLocality: "Guidonia Montecelio",
          addressRegion: "RM",
          addressCountry: "IT",
        },
        telephone: "Telefono da confermare",
        openingHours: "Orari da confermare",
      },
      {
        "@type": "CafeOrCoffeeShop",
        "@id": "https://www.nome-caffetteria.it/#tagliacozzo",
        name: "Nome Caffetteria - Tagliacozzo",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Indirizzo da confermare",
          addressLocality: "Tagliacozzo",
          addressRegion: "AQ",
          addressCountry: "IT",
        },
        telephone: "Telefono da confermare",
        openingHours: "Orari da confermare",
      },
    ],
  };
}
```

Inserimento nel markup:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(getCafeSchema()) }}
/>
```

Validare lo schema prima del deploy con uno strumento di test per rich results o schema markup.

## Ottimizzazione contenuti per pagina

### Home `/`
SEO focus:
- Caffetteria a Guidonia Montecelio e Tagliacozzo.
- Esperienza, qualità del caffè, colazione, sedi.

Struttura consigliata:
- `h1`: Caffetteria a Guidonia Montecelio e Tagliacozzo
- `h2`: Le nostre sedi
- `h2`: Caffè, colazioni e pause di qualità
- `h2`: Vieni a trovarci

Link interni:
- CTA a `/contatti`.
- Link a `/chi-siamo` dalla sezione editoriale.
- Link a Google Maps solo nelle CTA di sede o contatto.

### Chi siamo `/chi-siamo`
SEO focus:
- Identità della caffetteria.
- Qualità, accoglienza, territorio.

Struttura consigliata:
- `h1`: Chi siamo
- `h2`: La nostra idea di caffetteria
- `h2`: Due sedi, una stessa cura
- `h2`: Qualità, accoglienza e territorio

Link interni:
- Link a `/contatti` nel paragrafo sulle sedi.
- Link alla Home dal breadcrumb o CTA finale.

### Contatti `/contatti`
SEO focus:
- Sedi, indirizzi, orari, telefono e indicazioni.

Struttura consigliata:
- `h1`: Contatti e sedi
- `h2`: Sede di Guidonia Montecelio
- `h2`: Sede di Tagliacozzo
- `h2`: Scrivici

Requisiti:
- Ogni sede deve avere NAP completo.
- Ogni sede deve avere link `Indicazioni su Google Maps`.
- Le mappe embed devono essere lazy-loaded o sostituite da card/link per non rallentare il caricamento.
- Inserire `mailto:` e `tel:` se email e telefono sono disponibili.

## Immagini SEO
- Usare nomi file descrittivi: `caffetteria-guidonia-montecelio.webp`, `caffe-tagliacozzo.webp`.
- Evitare nomi generici: `IMG_1234.jpg`.
- Usare WebP o AVIF dove possibile.
- Definire sempre `width` e `height`.
- Usare `alt` descrittivi e naturali, senza keyword stuffing.
- Hero image ottimizzata e prioritaria solo sulla Home.
- Lazy loading per immagini sotto la prima schermata.

Esempi alt:
- `Banco caffetteria nella sede di Guidonia Montecelio`.
- `Sala interna della caffetteria a Tagliacozzo`.
- `Tazza di caffè servita al banco`.

## Performance e Core Web Vitals
Target minimi:
- Lighthouse Performance: 90+
- Lighthouse SEO: 90+
- Lighthouse Accessibility: 90+
- LCP sotto 2.5s
- CLS sotto 0.1
- INP sotto 200ms

Azioni richieste:
- Usare immagini ottimizzate in WebP/AVIF.
- Lazy loading per immagini non above-the-fold.
- Preload del font solo se necessario.
- Evitare bundle GSAP non usati.
- Evitare slider pesanti nella Hero.
- Ridurre JavaScript non necessario.
- Usare componenti server dove possibile.
- Caricare animazioni solo dopo il rendering dei contenuti principali.
- Evitare layout shift riservando spazio per immagini, header, card e mappe.

## Ottimizzazione GSAP per SEO e performance
- Importare GSAP solo in componenti client.
- Usare `dynamic import` se le animazioni sono usate in sezioni specifiche.
- Non bloccare rendering, contenuti testuali e CTA con animazioni iniziali.
- Non usare `opacity: 0` permanente in HTML senza fallback.
- Rispettare `prefers-reduced-motion`.
- Disattivare parallax e scrub pesanti su mobile se impattano le performance.

## Indicizzazione e ambienti
Produzione:
- `robots.txt` deve consentire la scansione.
- Le pagine devono avere canonical verso il dominio reale.
- La sitemap deve usare il dominio reale.
- Nessun meta `noindex` sulle pagine pubbliche.

Staging/sviluppo:
- Evitare indicizzazione con password, header o meta `noindex`.
- Non inviare sitemap di staging a Google Search Console.

## Google Search Console e analytics
Prima del go-live:
- Collegare Google Search Console al dominio.
- Inviare `/sitemap.xml`.
- Verificare copertura e indicizzazione.
- Verificare eventuali errori 404.
- Collegare analytics privacy-friendly o GA4 solo con cookie banner se necessario.
- Configurare eventi: click telefono, click WhatsApp, click Google Maps, invio form.

Eventi consigliati:

```txt
click_phone
click_whatsapp
click_maps_guidonia
click_maps_tagliacozzo
form_contact_submit
```

## Checklist SEO pre-deploy
- [ ] Dominio reale inserito in `siteSeo.baseUrl`.
- [ ] `sitemap.xml` aggiornata con dominio reale.
- [ ] `robots.txt` aggiornato con dominio reale.
- [ ] Ogni pagina ha title e meta description unici.
- [ ] Ogni pagina ha canonical corretto.
- [ ] Open Graph image presente e ottimizzata.
- [ ] H1 unico per ogni pagina.
- [ ] Heading gerarchici e leggibili.
- [ ] Schema.org valido e con dati reali.
- [ ] NAP delle sedi completo e coerente.
- [ ] Immagini ottimizzate e con alt descrittivi.
- [ ] Nessuna pagina pubblica in `noindex`.
- [ ] Nessun link rotto.
- [ ] Form contatti funzionante e validato.
- [ ] Lighthouse 90+ su Performance, SEO e Accessibility.
- [ ] Google Search Console collegata dopo il deploy.

## Criteri di accettazione SEO
Il lavoro SEO è completato quando:
- La sitemap XML è raggiungibile su `/sitemap.xml`.
- Il robots.txt è raggiungibile su `/robots.txt`.
- Home, Chi siamo e Contatti sono presenti in sitemap.
- Ogni pagina ha metadata completi e unici.
- Le due sedi sono presenti nei contenuti visibili e nei dati strutturati.
- Le CTA locali sono tracciabili e facilmente raggiungibili.
- Il sito supera la verifica base con Lighthouse e Search Console.

---

## Performance
- Usare immagini ottimizzate in WebP/AVIF.
- Lazy loading per immagini non above-the-fold.
- Preload del font solo se necessario.
- Evitare bundle GSAP non usati.
- Target Lighthouse: 90+ performance, 90+ accessibilità, 90+ SEO.

## Criteri di accettazione
Il lavoro è completato quando:
- Esistono le pagine Home, Chi siamo e Contatti.
- Il menu funziona su desktop e mobile.
- La Home contiene il blocco sedi con due card.
- Le sedi riportano Guidonia Montecelio e Tagliacozzo.
- Il font stack usa Futura come font principale.
- La palette è coerente con il brief.
- GSAP è usato per reveal/scroll/hover dove utile.
- Le animazioni rispettano `prefers-reduced-motion`.
- Il sito è responsive e non presenta overflow orizzontale.
- Contatti, mappe e CTA sono facilmente raggiungibili.
- SEO tecnico, sitemap e robots sono pronti per il deploy.

## Da chiedere al cliente prima del deploy
- Nome definitivo della caffetteria.
- Logo in SVG.
- Dominio definitivo.
- Indirizzi completi delle due sedi.
- Orari aggiornati.
- Telefono, email, WhatsApp.
- Foto originali in alta qualità.
- Link Google Maps delle due sedi.
- Accesso o dati Google Business Profile, se disponibili.
