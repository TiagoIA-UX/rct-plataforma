"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NodeCard } from "@/components/rede/NodeCard";

export default function RedePage() {
  const [autorizado, setAutorizado] = useState<boolean | null>(null);
  const [dados, setDados] = useState<{
    nivel: string;
    frase_reconhecimento?: string;
  } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("rct_diagnostico");
    if (stored) {
      const parsed = JSON.parse(stored);
      setDados(parsed);
      setAutorizado(parsed.nivel === "escolhido" || parsed.nivel === "alto");
    } else {
      setAutorizado(false);
    }
  }, []);

  if (autorizado === null) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <p className="text-[rgba(248,246,240,0.6)]">Verificando ressonância...</p>
      </div>
    );
  }

  if (!autorizado) {
    return (
      <div className="px-6 pt-32 pb-24 text-center">
        <div className="mx-auto max-w-xl card-sacred rounded-sm p-10">
          <h1 className="font-[family-name:var(--font-cormorant)] text-3xl text-[var(--pure-white)]">
            Área da Rede
          </h1>
          <p className="mt-4 text-[rgba(248,246,240,0.75)]">
            O acesso à rede requer diagnóstico de ressonância com nível &ldquo;alto&rdquo; ou
            &ldquo;escolhido&rdquo;. Complete o diagnóstico para verificar sua frequência.
          </p>
          <Link href="/diagnostico" className="btn-primary mt-8 inline-flex">
            Iniciar Diagnóstico
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl text-[var(--sacred-gold)]">
          A Rede dos Escolhidos
        </h1>
        <p className="mt-4 text-[rgba(248,246,240,0.75)]">
          Cada membro é um nó. Cada nó tem um território. A rede se auto-organiza por ressonância.
        </p>

        {dados?.frase_reconhecimento && (
          <div className="mt-8 card-sacred rounded-sm p-6">
            <p className="italic text-[var(--sacred-gold)]">&ldquo;{dados.frase_reconhecimento}&rdquo;</p>
          </div>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <NodeCard nome="Você" territorio="ciencia_tecnologia" frase={dados?.frase_reconhecimento} />
          <div className="card-sacred flex items-center justify-center rounded-sm p-6 text-center text-[rgba(248,246,240,0.5)]">
            <p>Nós da rede serão revelados conforme a rede cresce.</p>
          </div>
        </div>

        <div className="mt-12">
          <Link href="/contribuir" className="btn-secondary">
            Contribuir com o que você sabe →
          </Link>
        </div>
      </div>
    </div>
  );
}
