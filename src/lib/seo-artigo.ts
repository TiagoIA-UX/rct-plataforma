import type { Metadata } from "next";
import { MARCA_NOME } from "@/lib/identidade";
import { urlAbsolutaImagem, urlArtigo } from "@/lib/compartilhar-redes";
import type { ImagemCategoria } from "@/lib/imagens-artigo";

export interface ArtigoSeoInput {
  slug: string;
  titulo: string;
  subtitulo?: string | null;
  meta_descricao?: string | null;
  created_at: string | Date;
  imagem: ImagemCategoria;
}

/** Metadados Open Graph / Twitter Card por artigo (preview em LinkedIn, Facebook, X, WhatsApp). */
export function metadataArtigo(artigo: ArtigoSeoInput): Metadata {
  const descricao =
    artigo.meta_descricao?.trim() ||
    artigo.subtitulo?.trim() ||
    `${artigo.titulo} — ${MARCA_NOME}`;

  const url = urlArtigo(artigo.slug);
  const imageUrl = urlAbsolutaImagem(artigo.imagem.url);

  return {
    title: artigo.titulo,
    description: descricao,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: artigo.titulo,
      description: descricao,
      siteName: MARCA_NOME,
      locale: "pt_BR",
      publishedTime:
        typeof artigo.created_at === "string"
          ? artigo.created_at
          : artigo.created_at.toISOString(),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: artigo.imagem.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: artigo.titulo,
      description: descricao,
      images: [imageUrl],
    },
  };
}
