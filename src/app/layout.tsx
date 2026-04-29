import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { siteSeo } from "@/data/seo";
import "@/styles/globals.css";

const futura = localFont({
  src: [
    {
      path: "../../fonts/FuturaCyrillicBook.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/FuturaCyrillicBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-futura",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteSeo.baseUrl),
  title: {
    default: siteSeo.siteName,
    template: `%s`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${futura.className} ${futura.variable}`} suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
