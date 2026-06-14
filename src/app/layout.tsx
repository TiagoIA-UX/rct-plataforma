import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import { ConsentAwareAnalytics } from "@/components/legal/ConsentAwareAnalytics";
import { CookieConsent } from "@/components/legal/CookieConsent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RCT_DESCRICAO_PADRAO, RCT_NOME_COMPLETO, RCT_NOME_EXIBICAO, RCT_SIGLA } from "@/lib/identidade";
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
    default: RCT_NOME_EXIBICAO,
    template: `%s | ${RCT_SIGLA}`,
  },
  description: RCT_DESCRICAO_PADRAO,
  keywords: [
    RCT_SIGLA,
    RCT_NOME_COMPLETO,
    "fé e ciência",
    "não-violência",
    "vida interior",
    "espiritualidade",
  ],
  openGraph: {
    title: RCT_NOME_EXIBICAO,
    description: "Fé e ciência do comportamento no mesmo caminho — estudos publicados com referências verificáveis.",
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
