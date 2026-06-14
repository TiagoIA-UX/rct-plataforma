"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ImagemConteudo } from "@/components/shared/ImagemConteudo";
import { IMAGENS } from "@/lib/imagens";
import { MARCA_NOME } from "@/lib/identidade";
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
        <p className="text-[rgba(248,246,240,0.6)]">Carregando...</p>
      </div>
    );
  }

  if (!autorizado) {
    return (
      <div className="px-6 pt-32 pb-24 text-center">
        <div className="mx-auto max-w-xl">
          <ImagemConteudo
            src={IMAGENS.comunidade.src}
            alt={IMAGENS.comunidade.alt}
            credito={IMAGENS.comunidade.credito}
            className="mb-8"
          />
          <div className="card-sacred rounded-sm p-10">
          <h1 className="font-[family-name:var(--font-cormorant)] text-3xl text-[var(--pure-white)]">
            Comunidade {MARCA_NOME}
          </h1>
          <p className="mt-4 text-[rgba(248,246,240,0.75)]">
            Esta área reúne quem se identifica com os princípios de {MARCA_NOME} — sem escala de
            quem vale mais, julgada por humanos. O blog e o caminho permanecem abertos a todos.
          </p>
          <Link href="/diagnostico" className="btn-primary mt-8 inline-flex">
            Questionário (opcional)
          </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-4xl">
        <ImagemConteudo
          src={IMAGENS.comunidade.src}
          alt={IMAGENS.comunidade.alt}
          credito={IMAGENS.comunidade.credito}
          className="mb-8"
        />
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl text-[var(--sacred-gold)]">
          Comunidade {MARCA_NOME}
        </h1>
        <p className="mt-4 text-[rgba(248,246,240,0.75)]">
          Pessoas de diferentes áreas — saúde, educação, ciência, família — caminhando
          juntas com transparência e respeito mútuo.
        </p>

        {dados?.frase_reconhecimento && (
          <div className="mt-8 card-sacred rounded-sm p-6">
            <p className="italic text-[var(--sacred-gold)]">&ldquo;{dados.frase_reconhecimento}&rdquo;</p>
          </div>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <NodeCard nome="Você" territorio="ciencia_tecnologia" frase={dados?.frase_reconhecimento} />
          <div className="card-sacred flex items-center justify-center rounded-sm p-6 text-center text-[rgba(248,246,240,0.5)]">
            <p>Novos participantes aparecerão aqui conforme a comunidade crescer.</p>
          </div>
        </div>

        <div className="mt-12">
          <Link href="/contribuir" className="btn-secondary">
            Apoiar via PIX →
          </Link>
        </div>
      </div>
    </div>
  );
}
