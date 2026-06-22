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
