import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  CDN_BLOG_HEADERS,
  CDN_STATIC_HEADERS,
  NO_STORE_HEADERS,
} from "@/lib/cache";

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

function applyHeaders(response: NextResponse, headers: Record<string, string>) {
  for (const [key, value] of Object.entries(headers)) {
    response.headers.set(key, value);
  }
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (NO_CACHE_PREFIXES.some((p) => pathname.startsWith(p)) || pathname === "/diagnostico") {
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

export const config = {
  matcher: [
    "/((?!_next/image|favicon.ico|icon|apple-icon|opengraph-image).*)",
  ],
};
