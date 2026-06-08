"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "rct_cookie_consent";

export function CookieConsent() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (!salvo) setVisivel(true);
  }, []);

  function aceitar(tipo: "essencial" | "todos") {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ tipo, em: new Date().toISOString() })
    );
    setVisivel(false);
    if (tipo === "todos") {
      window.dispatchEvent(new Event("rct:analytics-consent"));
    }
  }

  if (!visivel) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimento de cookies"
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-gold bg-[rgba(13,21,32,0.97)] p-6 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-[rgba(248,246,240,0.8)]">
          Usamos cookies essenciais para o site funcionar e, com seu consentimento, cookies de
          medição anônima (Vercel Analytics). Leia nossa{" "}
          <Link href="/privacidade" className="underline">
            Política de Privacidade
          </Link>{" "}
          e{" "}
          <Link href="/cookies" className="underline">
            Política de Cookies
          </Link>
          . Conforme LGPD (Brasil) e GDPR (União Europeia).
        </p>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button type="button" onClick={() => aceitar("essencial")} className="btn-secondary text-sm">
            Só essenciais
          </button>
          <button type="button" onClick={() => aceitar("todos")} className="btn-primary text-sm">
            Aceitar medição
          </button>
        </div>
      </div>
    </div>
  );
}

export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { tipo?: string };
    return parsed.tipo === "todos";
  } catch {
    return false;
  }
}
