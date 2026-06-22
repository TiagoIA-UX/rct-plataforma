import { env } from "@/lib/config/env";

/** URL canônica absoluta do artigo (OG + compartilhamento). */
export function urlArtigo(slug: string, origin?: string): string {
  const base = (origin ?? env.siteUrl).replace(/\/$/, "");
  return `${base}/blog/${slug}`;
}

/** Substitui placeholders editoriais pelo link real. */
export function aplicarUrlNoTextoSocial(texto: string, url: string): string {
  return texto
    .replace(/\[URL\]/gi, url)
    .replace(/URL do artigo\.?/gi, url)
    .trim();
}

export function textoFallbackRede(
  rede: "linkedin" | "facebook" | "whatsapp" | "instagram",
  titulo: string,
  descricao: string,
  url: string
): string {
  const corpo = descricao.trim() || titulo;
  switch (rede) {
    case "linkedin":
      return `${titulo}\n\n${corpo}\n\nLeia o artigo completo: ${url}`;
    case "facebook":
      return `${titulo}\n\n${corpo}\n\n${url}`;
    case "whatsapp":
      return `${titulo}\n\n${corpo}\n\n${url}`;
    case "instagram":
      return `${titulo}\n\n${corpo}\n\nLink na bio ou nos stories: ${url}`;
    default:
      return `${titulo}\n\n${url}`;
  }
}

export function resolverTextoRede(
  textoEditorial: string | null | undefined,
  rede: "linkedin" | "facebook" | "whatsapp" | "instagram",
  titulo: string,
  descricao: string,
  url: string
): string {
  if (textoEditorial?.trim()) {
    return aplicarUrlNoTextoSocial(textoEditorial, url);
  }
  return textoFallbackRede(rede, titulo, descricao, url);
}

export function urlLinkedInShare(articleUrl: string): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
}

export function urlFacebookShare(articleUrl: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
}

export function urlXShare(texto: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}`;
}

export function urlWhatsAppShare(texto: string): string {
  return `https://wa.me/?text=${encodeURIComponent(texto)}`;
}

/** Garante URL absoluta HTTPS para crawlers (OG). */
export function urlAbsolutaImagem(url: string, siteOrigin?: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = (siteOrigin ?? env.siteUrl).replace(/\/$/, "");
  return `${base}${url.startsWith("/") ? url : `/${url}`}`;
}
