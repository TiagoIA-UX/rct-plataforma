import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Cormorant_Garamond, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  weight: ["400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "RCT — Religião Científica Tecnológica",
    template: "%s | RCT",
  },
  description:
    "A plataforma onde a Ciência explica o que Jesus viveu, Patanjali nomeou, e a Tecnologia agora conecta.",
  keywords: [
    "RCT",
    "Ahimsa",
    "epigenética",
    "neurociência",
    "ciência verificável",
    "espiritualidade pura",
  ],
  openGraph: {
    title: "RCT — Religião Científica Tecnológica",
    description: "O fim do misticismo irracional. O início da evolução biológica consciente.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${sourceSerif.variable} ${jetbrains.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
