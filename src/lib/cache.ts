/**
 * Políticas de cache — Edge Network (Vercel CDN) + ISR do Next.js.
 * @see https://vercel.com/docs/edge-network/caching
 */

export const CACHE_TTL = {
  /** Blog atualiza ~1x/dia (cron 03h) — revalidar na borda a cada hora */
  blog: 60 * 60,
  /** Home com grid de artigos */
  home: 30 * 60,
  /** Páginas estáticas (caminho, legal, contribuir) */
  static: 24 * 60 * 60,
  /** Assets em /public e /_next/static */
  assets: 31_536_000,
} as const;

export const CACHE_TAGS = {
  artigos: "artigos",
  artigo: (slug: string) => `artigo:${slug}`,
} as const;

export const CACHE_CONTROL = {
  immutable: `public, max-age=${CACHE_TTL.assets}, immutable`,
  noStore: "private, no-store, no-cache, must-revalidate",
  /** HTML público — navegador revalida; CDN guarda na borda */
  cdnPublic: (sMaxAge: number, swr = CACHE_TTL.static) =>
    `public, max-age=0, s-maxage=${sMaxAge}, stale-while-revalidate=${swr}`,
  cdnBlog: `public, max-age=0, s-maxage=${CACHE_TTL.blog}, stale-while-revalidate=${CACHE_TTL.static}`,
  cdnStatic: `public, max-age=0, s-maxage=${CACHE_TTL.static}, stale-while-revalidate=604800`,
} as const;

export const NO_STORE_HEADERS: Record<string, string> = {
  "Cache-Control": CACHE_CONTROL.noStore,
  "CDN-Cache-Control": "no-store",
  "Vercel-CDN-Cache-Control": "no-store",
};

export const CDN_BLOG_HEADERS: Record<string, string> = {
  "Cache-Control": CACHE_CONTROL.cdnBlog,
  "CDN-Cache-Control": CACHE_CONTROL.cdnBlog,
  "Vercel-CDN-Cache-Control": CACHE_CONTROL.cdnBlog,
};

export const CDN_STATIC_HEADERS: Record<string, string> = {
  "Cache-Control": CACHE_CONTROL.cdnStatic,
  "CDN-Cache-Control": CACHE_CONTROL.cdnStatic,
  "Vercel-CDN-Cache-Control": CACHE_CONTROL.cdnStatic,
};
