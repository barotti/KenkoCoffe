import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { siteSeo } from "@/data/seo";
import "@/styles/globals.css";

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
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
