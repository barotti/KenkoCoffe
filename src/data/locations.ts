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
    address: "Viale Roma 118, 00012 Guidonia Montecelio RM",
    phone: "Telefono da confermare",
    email: "Email da confermare",
    whatsapp: "WhatsApp da confermare",
    hours: "Orari da confermare",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Viale%20Roma%20118%2C%2000012%20Guidonia%20Montecelio%20RM",
    image: "/images/sedi/guidonia/_DSC7150.jpg",
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

const guidoniaGalleryFiles = [
  "11EDBA5E-40D3-497F-B233-30D8CB4BE258.JPG",
  "4dd00912-7d1a-4756-ae73-33593a29cbff(1).jpg",
  "4dd00912-7d1a-4756-ae73-33593a29cbff.jpg",
  "508c1860-10ca-4b4c-8520-b93aea77f219.jpg",
  "Beige Minimale Bar Collage di Foto Storia Instagram.PNG",
  "Brand Visual Kenko 1(1).png",
  "Brand Visual Kenko 1.png",
  "Brand Visual Kenko 10.jpg",
  "Brand Visual Kenko 2.png",
  "Brand Visual Kenko 3.png",
  "Brand Visual Kenko 4.png",
  "Brand Visual Kenko 5.png",
  "Brand Visual Kenko 6.png",
  "Brand Visual Kenko 7(1).png",
  "Brand Visual Kenko 7.png",
  "Brand Visual Kenko 9.jpg",
  "DSC00818.PNG",
  "DSC00863.jpg",
  "DSC00998.png",
  "Gemini_Generated_Image_hbmx0whbmx0whbmx.png",
  "IMG_0223.PNG",
  "Natale Kenko 2.jpg",
  "Natale Kenko.jpg",
  "_DSC1423.png",
  "_DSC1549.jpg",
  "_DSC1552.jpg",
  "_DSC2458.JPG",
  "_DSC4908.png",
  "_DSC4927.JPG",
  "_DSC4951.JPG",
  "_DSC5870.JPG",
  "_DSC7150.jpg",
];
const tagliacozzoGalleryFiles = [
  "_DSC2975.jpeg",
  "_DSC2999.jpeg",
  "_DSC3008.jpeg",
  "_DSC3013.jpeg",
  "_DSC3021.jpeg",
  "_DSC3024.jpeg",
  "_DSC3028.jpeg",
  "_DSC8509.jpg",
  "_DSC8511.jpg",
  "_DSC8513.jpg",
  "_DSC8517.jpg",
  "_DSC8531.jpg",
  "_DSC8542-2.jpg",
  "_DSC8546.jpg",
  "IMG_6232.JPG",
  "IMG_6257.jpg",
];

export const locationGalleries: Record<Location["id"], GalleryMedia[]> = {
  "guidonia-montecelio": guidoniaGalleryFiles.map((file) => ({
    type: "image",
    src: `/images/sedi/guidonia/${encodeURIComponent(file)}`,
    alt: "Gallery della sede Kenko Kohi di Guidonia Montecelio",
  })),
  "tagliacozzo": tagliacozzoGalleryFiles.map((file) => ({
    type: "image",
    src: `/images/sedi/tagliacozzo/${encodeURIComponent(file)}`,
    alt: "Gallery della sede Kenko Kohi di Tagliacozzo",
  })),
};

export function getLocationById(id: string) {
  return locations.find((location) => location.id === id);
}
