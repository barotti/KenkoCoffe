import type { ReactNode } from "react";
import { Lora, JetBrains_Mono } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-caffe",
  weight: ["300", "400"],
  display: "swap",
});

export default function CaffeLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${lora.variable} ${mono.variable}`}>
      {children}
    </div>
  );
}
