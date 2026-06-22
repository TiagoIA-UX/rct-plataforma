"use client";

import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
import { GoogleTag } from "@/components/analytics/GoogleTag";
import { hasAnalyticsConsent } from "@/components/legal/CookieConsent";

export function ConsentAwareAnalytics() {
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    setAtivo(hasAnalyticsConsent());
    const handler = () => setAtivo(hasAnalyticsConsent());
    window.addEventListener("rct:analytics-consent", handler);
    return () => window.removeEventListener("rct:analytics-consent", handler);
  }, []);

  if (!ativo) return null;
  return (
    <>
      <GoogleTag />
      <Analytics />
    </>
  );
}
