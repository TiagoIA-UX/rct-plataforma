"use client";

import { useState } from "react";
import Link from "next/link";

const FASES = [
  {
    id: "divya_manas",
    titulo: "Divya Manas — Despertar da Mente Divina",
    descricao:
      "Desenvolvimento da consciência através de respiração, coerência cardíaca e decodificação dos milagres. Aberto a todos.",
    pergunta:
      "Descreva como você compreende a relação entre os milagres de Jesus e a neuroplasticidade. O que isso muda na sua vida prática hoje?",
  },
  {
    id: "fase_i",
    titulo: "Fase I — Fundamentos (restrita)",
    descricao: "Sistema nervoso, coerência cardíaca, Ahimsa aplicada. Requer aprovação do Divya Manas.",
    pergunta: "Em desenvolvimento — aguarde aprovação da fase anterior.",
    bloqueada: true,
  },
] as const;

export default function TreinamentoPage() {
  const [faseAtiva, setFaseAtiva] = useState("divya_manas");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<string | null>(null);

  const fase = FASES.find((f) => f.id === faseAtiva)!;

  async function submeterProva() {
    setLoading(true);
    setResultado(null);
    try {
      const res = await fetch("/api/treinamento/prova", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, nome, fase: faseAtiva, resposta }),
      });
      const json = await res.json();
      if (!res.ok) {
        setResultado(json.error ?? "Erro ao submeter.");
        return;
      }
      setResultado(json.mensagem);
    } catch {
      setResultado("Falha de conexão.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl text-[var(--sacred-gold)]">
          O Forno do Oleiro
        </h1>
        <p className="mt-4 text-[rgba(248,246,240,0.75)]">
          Todos são evangelizados. Poucos são treinados. Cada fase exige prova de coerência
          — detecção de incoerência nas palavras — e aprovação do administrador.
        </p>

        <div className="mt-10 grid gap-4">
          {FASES.map((f) => (
            <button
              key={f.id}
              onClick={() => !("bloqueada" in f && f.bloqueada) && setFaseAtiva(f.id)}
              className={`card-sacred p-6 text-left transition-opacity ${
                faseAtiva === f.id ? "border-[var(--sacred-gold)]" : ""
              } ${"bloqueada" in f && f.bloqueada ? "opacity-50" : ""}`}
            >
              <h2 className="text-xl text-[var(--pure-white)]">{f.titulo}</h2>
              <p className="mt-2 text-sm text-[rgba(248,246,240,0.65)]">{f.descricao}</p>
            </button>
          ))}
        </div>

        {!("bloqueada" in fase && fase.bloqueada) && (
          <div className="card-sacred mt-10 space-y-6 rounded-sm p-8">
            <p className="italic text-[var(--sacred-gold)]">{fase.pergunta}</p>
            <input
              className="input-sacred"
              placeholder="Seu e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input-sacred"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <textarea
              className="input-sacred min-h-[200px] resize-y"
              placeholder="Sua resposta (mín. 200 caracteres)..."
              value={resposta}
              onChange={(e) => setResposta(e.target.value)}
            />
            <button onClick={submeterProva} disabled={loading} className="btn-primary">
              {loading ? "Analisando coerência..." : "Submeter Prova"}
            </button>
            {resultado && <p className="text-sm text-[var(--sacred-gold)]">{resultado}</p>}
          </div>
        )}

        <div className="mt-10">
          <Link href="/blog?categoria=milagres-decodificados" className="btn-secondary">
            Começar pelos Milagres Decodificados →
          </Link>
        </div>
      </div>
    </div>
  );
}
