"use client";

import Script from "next/script";
import { GA_MEASUREMENT_ID, isGoogleAnalyticsEnabled } from "@/lib/analytics";

/**
 * Google tag (gtag.js) — uma única instância por página, via layout raiz.
 * Carregada após consentimento de cookies (ConsentAwareAnalytics).
 */
export function GoogleTag() {
  if (!isGoogleAnalyticsEnabled()) return null;

  const id = GA_MEASUREMENT_ID;

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
