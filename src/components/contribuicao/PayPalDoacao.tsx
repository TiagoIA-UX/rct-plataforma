"use client";

import { useState } from "react";
import { DOACAO } from "@/lib/doacao";

export function PayPalDoacao() {
  const [copiado, setCopiado] = useState(false);

  async function copiarEmail() {
    try {
      await navigator.clipboard.writeText(DOACAO.paypalEmail);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      setCopiado(false);
    }
  }

  return (
    <div className="card-sacred rounded-sm p-8">
      <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--pure-white)]">
        Doação via PayPal
      </h2>
      <p className="mt-3 text-sm text-[rgba(248,246,240,0.7)]">
        Para quem prefere contribuir de fora do Brasil ou sem PIX.
      </p>
      <p className="mt-6 font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
        E-mail PayPal
      </p>
      <p className="mt-2 break-all font-[family-name:var(--font-jetbrains)] text-lg text-[var(--pure-white)]">
        <a href={`mailto:${DOACAO.paypalEmail}`} className="hover:underline">
          {DOACAO.paypalEmail}
        </a>
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={copiarEmail} className="btn-primary">
          {copiado ? "E-mail copiado" : "Copiar e-mail PayPal"}
        </button>
        <a
          href={`https://www.paypal.com/myaccount/transfer/homepage/pay`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          Abrir PayPal →
        </a>
      </div>
    </div>
  );
}
