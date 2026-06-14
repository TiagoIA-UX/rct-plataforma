/**
 * Imagens de capa — palavra-chave do título define a foto.
 */

import {
  resolverImagemPorPalavraChave,
  extrairPalavraChaveImagem,
  type ImagemArtigo,
} from "@/lib/imagens-palavra-chave";

export type ImagemCategoria = {
  url: string;
  alt: string;
  credit: string;
  palavra_chave?: string;
};

const IMAGEM_PADRAO: ImagemCategoria = {
  url: "https://images.unsplash.com/photo-1507963901243-ebfaecd5f2f4?w=1200&q=80",
  alt: "Luz e consciência — Todos Sejam Um",
  credit: "Unsplash — Giammarco Boscaro",
};

function dePalavraChave(img: ImagemArtigo): ImagemCategoria {
  return {
    url: img.url,
    alt: img.alt,
    credit: img.credit,
    palavra_chave: img.palavra_chave,
  };
}

export function resolverImagemArtigo(
  imageUrl?: string | null,
  imageCredit?: string | null,
  categoria?: string,
  _indice = 0,
  titulo?: string | null,
  slug?: string | null
): ImagemCategoria {
  if (titulo?.trim()) {
    return dePalavraChave(
      resolverImagemPorPalavraChave(titulo, { slug: slug ?? undefined, categoria })
    );
  }

  if (imageUrl) {
    return {
      url: imageUrl,
      alt: "Imagem do artigo",
      credit: imageCredit ?? "Todos Sejam Um",
    };
  }

  return IMAGEM_PADRAO;
}

export function proximaImagemCategoria(
  categoria: string,
  _indice = 0,
  titulo?: string,
  slug?: string
): ImagemCategoria {
  if (titulo?.trim()) {
    return dePalavraChave(resolverImagemPorPalavraChave(titulo, { slug, categoria }));
  }
  return IMAGEM_PADRAO;
}

export { extrairPalavraChaveImagem, resolverImagemPorPalavraChave };
