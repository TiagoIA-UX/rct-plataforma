"use client";

import { useEffect, useState } from "react";
import { ContribuicaoCard } from "@/components/contribuicao/ContribuicaoCard";
import { ContribuicaoForm } from "@/components/contribuicao/ContribuicaoForm";

interface Contribuicao {
  id: string;
  autor_email: string;
  autor_nome: string | null;
  tipo: string;
  titulo: string;
  conteudo: string;
  referencia_cientifica: string | null;
  modulo_relacionado: string | null;
  status: string;
  votos_positivos: number;
  created_at: string;
}

export default function ContribuirPage() {
  const [contribuicoes, setContribuicoes] = useState<Contribuicao[]>([]);
  const [emailVoto, setEmailVoto] = useState("");

  useEffect(() => {
    fetch("/api/contribuicoes")
      .then((r) => r.json())
      .then(setContribuicoes)
      .catch(() => setContribuicoes([]));
  }, []);

  async function votar(id: string) {
    if (!emailVoto) {
      const email = prompt("Informe seu e-mail para endossar:");
      if (!email) return;
      setEmailVoto(email);
      await enviarVoto(id, email);
      return;
    }
    await enviarVoto(id, emailVoto);
  }

  async function enviarVoto(id: string, email: string) {
    const res = await fetch("/api/contribuicoes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, autor_email: email }),
    });
    if (res.ok) {
      const atualizada = await res.json();
      setContribuicoes((prev) =>
        prev.map((c) => (c.id === id ? { ...c, votos_positivos: atualizada.votos_positivos } : c))
      );
    }
  }

  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl text-[var(--sacred-gold)] md:text-5xl">
          O Vaso que se Aperfeiçoa
        </h1>
        <p className="mt-4 max-w-2xl text-[rgba(248,246,240,0.75)]">
          A RCT não é um dogma — é um organismo vivo. Cada contribuição verificável
          e científica é bem-vinda.
        </p>

        <div className="mt-12">
          <ContribuicaoForm />
        </div>

        {contribuicoes.length > 0 && (
          <div className="mt-16">
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--pure-white)]">
              Contribuições em Análise
            </h2>
            <div className="mt-8 grid gap-6">
              {contribuicoes.map((c) => (
                <ContribuicaoCard key={c.id} contribuicao={c} onVotar={votar} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
