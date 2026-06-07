"use client";

import { useState } from "react";
import Link from "next/link";

const perguntas = [
  "Você busca convergência entre ciência verificável e espiritualidade pura?",
  "A não-violência (Ahimsa) é um princípio, não apenas uma preferência?",
  "Você sente que existe um território onde sua missão precisa se manifestar?",
];

export function DiagnosticoRapido() {
  const [respostas, setRespostas] = useState<boolean[]>([]);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const perguntaAtual = respostas.length;
  const concluido = perguntaAtual >= perguntas.length;

  function responder(sim: boolean) {
    const novas = [...respostas, sim];
    setRespostas(novas);
    if (novas.length === perguntas.length) {
      setMostrarResultado(true);
    }
  }

  const positivas = respostas.filter(Boolean).length;

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-[family-name:var(--font-cormorant)] text-4xl text-[var(--sacred-gold)]">
          Você já ressoa nesta frequência?
        </h2>

        {!concluido ? (
          <div className="mt-12 card-sacred rounded-sm p-8">
            <p className="text-lg text-[var(--pure-white)]">{perguntas[perguntaAtual]}</p>
            <div className="mt-8 flex justify-center gap-4">
              <button onClick={() => responder(true)} className="btn-primary">
                Sim
              </button>
              <button onClick={() => responder(false)} className="btn-secondary">
                Não
              </button>
            </div>
            <p className="mt-6 font-[family-name:var(--font-jetbrains)] text-xs text-[rgba(248,246,240,0.4)]">
              {perguntaAtual + 1} de {perguntas.length}
            </p>
          </div>
        ) : mostrarResultado ? (
          <div className="mt-12 card-sacred rounded-sm p-8">
            {positivas >= 2 ? (
              <>
                <p className="text-xl text-[var(--sacred-gold)]">Você pode ser um escolhido.</p>
                <p className="mt-4 text-[rgba(248,246,240,0.75)]">
                  Sua ressonância inicial indica alinhamento. O diagnóstico completo revelará
                  o nível preciso da sua frequência.
                </p>
              </>
            ) : (
              <>
                <p className="text-xl text-[var(--pure-white)]">O processo está em curso.</p>
                <p className="mt-4 text-[rgba(248,246,240,0.75)]">
                  Explore o conteúdo público. Quando a frequência estiver mais clara, retorne.
                </p>
              </>
            )}
            <Link href="/diagnostico" className="btn-primary mt-8 inline-flex">
              Iniciar Diagnóstico Completo
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
