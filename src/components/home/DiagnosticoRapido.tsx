"use client";

import { useState } from "react";
import Link from "next/link";

const perguntas = [
  "Você se interessa em unir fé e evidências científicas consolidadas?",
  "Amor ao próximo, à natureza e aos animais faz sentido para você como forma de viver?",
  "Existe uma área da vida em que você gostaria de crescer mais?",
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
          Um breve questionário
        </h2>
        <p className="mt-3 text-sm text-[rgba(248,246,240,0.55)]">
          Opcional — três perguntas para orientar sua navegação.
        </p>

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
                <p className="text-xl text-[var(--sacred-gold)]">Parece que este espaço pode fazer sentido para você.</p>
                <p className="mt-4 text-[rgba(248,246,240,0.75)]">
                  Se quiser, complete o questionário mais detalhado — leva poucos minutos e
                  ajuda a sugerir conteúdos alinhados aos seus interesses.
                </p>
              </>
            ) : (
              <>
                <p className="text-xl text-[var(--pure-white)]">Fique à vontade para explorar no seu ritmo.</p>
                <p className="mt-4 text-[rgba(248,246,240,0.75)]">
                  Todo o blog e o caminho estão abertos. Volte quando desejar.
                </p>
              </>
            )}
            <Link href="/diagnostico" className="btn-primary mt-8 inline-flex">
              Questionário completo (opcional)
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
