"use client";

import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
import { hasAnalyticsConsent } from "@/components/legal/CookieConsent";

/**
 * Vercel Analytics — só após consentimento. (A tag do Google fica em GoogleTag,
 * sempre carregada com Consent Mode v2, negado por padrão.)
 */
export function ConsentAwareAnalytics() {
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    setAtivo(hasAnalyticsConsent());
    const handler = () => setAtivo(hasAnalyticsConsent());
    window.addEventListener("rct:analytics-consent", handler);
    return () => window.removeEventListener("rct:analytics-consent", handler);
  }, []);

  if (!ativo) return null;
  return <Analytics />;
}
