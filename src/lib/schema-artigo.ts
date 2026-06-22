import { MARCA_NOME } from "@/lib/identidade";
import { urlAbsolutaImagem, urlArtigo } from "@/lib/compartilhar-redes";
import type { ImagemCategoria } from "@/lib/imagens-artigo";

export interface ArtigoSchemaInput {
  slug: string;
  titulo: string;
  subtitulo?: string | null;
  meta_descricao?: string | null;
  created_at: string | Date;
  updated_at?: string | Date | null;
  imagem: ImagemCategoria;
}

export function schemaArtigoJsonLd(artigo: ArtigoSchemaInput) {
  const descricao =
    artigo.meta_descricao?.trim() ||
    artigo.subtitulo?.trim() ||
    `${artigo.titulo} — ${MARCA_NOME}`;

  const url = urlArtigo(artigo.slug);
  const imageUrl = urlAbsolutaImagem(artigo.imagem.url);
  const published =
    typeof artigo.created_at === "string"
      ? artigo.created_at
      : artigo.created_at.toISOString();
  const modified = artigo.updated_at
    ? typeof artigo.updated_at === "string"
      ? artigo.updated_at
      : artigo.updated_at.toISOString()
    : published;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artigo.titulo,
    description: descricao,
    image: [imageUrl],
    datePublished: published,
    dateModified: modified,
    author: {
      "@type": "Organization",
      name: MARCA_NOME,
    },
    publisher: {
      "@type": "Organization",
      name: MARCA_NOME,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}
