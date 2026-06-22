import type { NextConfig } from "next";
import { CACHE_CONTROL } from "./src/lib/cache";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' https://images.unsplash.com data: blob:; font-src 'self' data:; connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
    minimumCacheTTL: 31_536_000,
  },
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 300,
    },
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: securityHeaders,
    },
    {
      source: "/_next/static/(.*)",
      headers: [{ key: "Cache-Control", value: CACHE_CONTROL.immutable }],
    },
    {
      source: "/images/(.*)",
      headers: [
        { key: "Cache-Control", value: CACHE_CONTROL.immutable },
        { key: "CDN-Cache-Control", value: CACHE_CONTROL.immutable },
      ],
    },
    {
      source: "/api/(.*)",
      headers: [
        { key: "Cache-Control", value: CACHE_CONTROL.noStore },
        { key: "CDN-Cache-Control", value: "no-store" },
        { key: "Vercel-CDN-Cache-Control", value: "no-store" },
      ],
    },
  ],
  redirects: async () => [
    { source: "/diagnostico", destination: "/", permanent: true },
  ],
};

export default nextConfig;
