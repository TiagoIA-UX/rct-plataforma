/** Google Analytics 4 — measurement ID (NEXT_PUBLIC_ para o cliente). */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-3NE1CZ1YQF";

export function isGoogleAnalyticsEnabled(): boolean {
  return Boolean(GA_MEASUREMENT_ID);
}

/** Artigos não devem embutir gtag — a tag vive só no layout raiz. */
export function conteudoContemGoogleTag(texto: string): boolean {
  return /googletagmanager\.com/i.test(texto) || /function\s+gtag\s*\(/i.test(texto);
}

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

/** Evento GA4 — compartilhamento de artigo (requer consentimento de cookies). */
export function trackShareArticle(articleSlug: string, network: string): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "share_article", {
    article_slug: articleSlug,
    network,
  });
}
