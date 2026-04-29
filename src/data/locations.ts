export type Location = {
  id: "guidonia-montecelio" | "tagliacozzo";
  name: string;
  href: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  hours: string;
  mapUrl: string;
  image: string;
  imageAlt: string;
};

export const locations: Location[] = [
  {
    id: "guidonia-montecelio",
    name: "Guidonia Montecelio",
    href: "/sedi/guidonia-montecelio",
    region: "RM",
    address: "Indirizzo da confermare",
    phone: "Telefono da confermare",
    email: "Email da confermare",
    whatsapp: "WhatsApp da confermare",
    hours: "Orari da confermare",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Guidonia%20Montecelio",
    image: "/images/home/_DSC7150.JPG",
    imageAlt: "Banco caffetteria nella sede di Guidonia Montecelio",
  },
  {
    id: "tagliacozzo",
    name: "Tagliacozzo",
    href: "/sedi/tagliacozzo",
    region: "AQ",
    address: "Indirizzo da confermare",
    phone: "Telefono da confermare",
    email: "Email da confermare",
    whatsapp: "WhatsApp da confermare",
    hours: "Orari da confermare",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Tagliacozzo",
    image: "/images/home/_DSC8511.jpg",
    imageAlt: "Sala interna della caffetteria a Tagliacozzo",
  },
];

export type GalleryMedia = {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
  width?: number;
  height?: number;
};

export const locationGalleries: Record<Location["id"], GalleryMedia[]> = {
  "guidonia-montecelio": [
    {
      type: "image",
      src: "/images/home/_DSC7150.JPG",
      alt: "Sala della sede Kenko Kohi di Guidonia Montecelio",
      width: 7008,
      height: 4672,
    },
    {
      type: "image",
      src: "/images/home/_DSC2454.JPG",
      alt: "Banco e sala della sede Kenko Kohi di Guidonia Montecelio",
      width: 7008,
      height: 4672,
    },
  ],
  tagliacozzo: [
    {
      type: "image",
      src: "/images/home/_DSC8511.jpg",
      alt: "Banco della sede Kenko Kohi di Tagliacozzo",
      width: 1200,
      height: 800,
    },
  ],
};

export function getLocationById(id: string) {
  return locations.find((location) => location.id === id);
}
