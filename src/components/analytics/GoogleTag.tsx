"use client";

import Script from "next/script";
import { useEffect } from "react";
import { GA_MEASUREMENT_ID, isGoogleAnalyticsEnabled } from "@/lib/analytics";
import { hasAnalyticsConsent } from "@/components/legal/CookieConsent";

/**
 * Google tag (gtag.js) com Consent Mode v2 — uma única instância por página,
 * via layout raiz. A tag SEMPRE carrega (permite verificação do Google e Tag
 * Assistant), mas com consentimento NEGADO por padrão: nenhum cookie/identificador
 * é gravado até o usuário aceitar em CookieConsent. Ao aceitar ("todos"), o
 * consentimento é atualizado para "granted".
 */
export function GoogleTag() {
  const id = GA_MEASUREMENT_ID;
  const enabled = isGoogleAnalyticsEnabled();

  useEffect(() => {
    if (!enabled) return;

    function concederConsentimento() {
      window.gtag?.("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    }

    if (hasAnalyticsConsent()) concederConsentimento();
    window.addEventListener("rct:analytics-consent", concederConsentimento);
    return () =>
      window.removeEventListener("rct:analytics-consent", concederConsentimento);
  }, [enabled]);

  if (!enabled) return null;

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
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
