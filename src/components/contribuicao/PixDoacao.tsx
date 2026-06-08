"use client";

import { useState } from "react";
import { DOACAO } from "@/lib/doacao";

export function PixDoacao() {
  const [copiado, setCopiado] = useState(false);
  const temChave = Boolean(DOACAO.chavePix);

  async function copiarChave() {
    if (!DOACAO.chavePix) return;
    try {
      await navigator.clipboard.writeText(DOACAO.chavePix);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      setCopiado(false);
    }
  }

  return (
    <div className="card-sacred rounded-sm p-8">
      <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--pure-white)]">
        Doação via PIX
      </h2>
      <p className="mt-3 text-sm text-[rgba(248,246,240,0.7)]">
        Valor livre. A doação é voluntária e ajuda a manter e expandir este trabalho.
      </p>

      {temChave ? (
        <div className="mt-8">
          <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
            Chave PIX (CNPJ)
          </p>
          <p className="mt-2 font-[family-name:var(--font-jetbrains)] text-lg text-[var(--pure-white)]">
            {DOACAO.cnpjFormatado}
          </p>
          <p className="mt-1 break-all font-[family-name:var(--font-jetbrains)] text-xs text-[rgba(248,246,240,0.5)]">
            {DOACAO.chavePix}
          </p>
          <button type="button" onClick={copiarChave} className="btn-primary mt-6">
            {copiado ? "Chave copiada" : "Copiar chave PIX"}
          </button>
        </div>
      ) : (
        <p className="mt-6 text-sm text-[rgba(248,246,240,0.6)]">
          A chave PIX será disponibilizada em breve. Enquanto isso, escreva para{" "}
          <a href={`mailto:${DOACAO.emailContato}`} className="underline">
            {DOACAO.emailContato}
          </a>
          .
        </p>
      )}

      <p className="mt-8 text-xs text-[rgba(248,246,240,0.45)]">
        Após doar, se desejar comprovante ou recibo, envie o comprovante para o e-mail de contato.
      </p>
    </div>
  );
}
