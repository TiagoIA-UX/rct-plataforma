import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";
import {
  CDN_BLOG_HEADERS,
  CDN_STATIC_HEADERS,
  NO_STORE_HEADERS,
} from "@/lib/cache";
import { isNeonAuthEnabled } from "@/lib/config/env";

const NO_CACHE_PREFIXES = ["/api/", "/admin"];

const STATIC_CDN_PATHS = new Set([
  "/caminho",
  "/contribuir",
  "/privacidade",
  "/termos",
  "/cookies",
  "/seguranca",
  "/manifesto",
]);

/** Áreas que exigem conta Google verificada (Neon Auth). */
const ROTAS_GOOGLE = ["/formacao", "/rede"];

const neonAuthProtect = auth.middleware({
  loginUrl: "/entrar",
});

function applyHeaders(response: NextResponse, headers: Record<string, string>) {
  for (const [key, value] of Object.entries(headers)) {
    response.headers.set(key, value);
  }
  return response;
}

function withCacheHeaders(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (NO_CACHE_PREFIXES.some((p) => pathname.startsWith(p))) {
    return applyHeaders(NextResponse.next(), NO_STORE_HEADERS);
  }

  if (pathname.startsWith("/_next/static") || pathname.startsWith("/images/")) {
    return NextResponse.next();
  }

  if (pathname === "/" || pathname.startsWith("/blog")) {
    return applyHeaders(NextResponse.next(), CDN_BLOG_HEADERS);
  }

  if (STATIC_CDN_PATHS.has(pathname)) {
    return applyHeaders(NextResponse.next(), CDN_STATIC_HEADERS);
  }

  return NextResponse.next();
}

function copiarCookies(origem: Response, destino: NextResponse) {
  const setCookie = origem.headers.getSetCookie?.() ?? [];
  for (const cookie of setCookie) {
    destino.headers.append("Set-Cookie", cookie);
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    isNeonAuthEnabled() &&
    ROTAS_GOOGLE.some((rota) => pathname === rota || pathname.startsWith(`${rota}/`))
  ) {
    const authResponse = await neonAuthProtect(request);

    if (authResponse.status >= 300 && authResponse.status < 400) {
      const loginUrl = new URL("/entrar", request.url);
      loginUrl.searchParams.set("redirectTo", pathname);
      const redirect = NextResponse.redirect(loginUrl);
      copiarCookies(authResponse, redirect);
      return redirect;
    }

    return authResponse;
  }

  return withCacheHeaders(request);
}

export const config = {
  matcher: [
    "/((?!_next/image|favicon.ico|icon|apple-icon|opengraph-image).*)",
  ],
};
