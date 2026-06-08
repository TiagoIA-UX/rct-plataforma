import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import { ConsentAwareAnalytics } from "@/components/legal/ConsentAwareAnalytics";
import { CookieConsent } from "@/components/legal/CookieConsent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://rct-plataforma.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RCT — Religião Científica Tecnológica",
    template: "%s | RCT",
  },
  description:
    "Tradição cristã e neurociência comportamental — memória, emoção, hábitos e vínculos com referências publicadas.",
  keywords: [
    "RCT",
    "fé e ciência",
    "Ahimsa",
    "fé e ciência",
    "vida interior",
    "espiritualidade",
  ],
  openGraph: {
    title: "RCT — Religião Científica Tecnológica",
    description: "Fé e neurociência comportamental no mesmo caminho — estudos publicados com referências verificáveis.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <ConsentAwareAnalytics />
      </body>
    </html>
  );
}
