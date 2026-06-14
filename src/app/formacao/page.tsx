"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ImagemConteudo } from "@/components/shared/ImagemConteudo";
import { IMAGENS } from "@/lib/imagens";
import { citacao } from "@/lib/referencias";

const FASES = [
  {
    id: "divya_manas",
    titulo: "Primeiros passos — mente serena",
    descricao:
      "Respiração consciente, calma interior e leitura dos evangelhos com apoio de estudos publicados em regulação emocional. Aberto a quem foi acolhido.",
    pergunta:
      "Com suas palavras: o que significa para você cuidar da mente e do corpo com base em evidências e em valores de paz?",
    ref: citacao("regulacao"),
  },
  {
    id: "fase_i",
    titulo: "Aprofundamento (mediante convite)",
    descricao: "Conteúdo reservado. Requer conclusão serena da fase anterior e acolhimento da equipe.",
    pergunta: "Disponível após aprovação da fase introdutória.",
    bloqueada: true,
    ref: null,
  },
] as const;

export default function FormacaoPage() {
  const [autorizado, setAutorizado] = useState<boolean | null>(null);
  const [faseAtiva, setFaseAtiva] = useState("divya_manas");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("rct_diagnostico");
    if (stored) {
      const parsed = JSON.parse(stored);
      setAutorizado(parsed.acesso_formacao === true);
    } else {
      setAutorizado(false);
    }
  }, []);

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
        setResultado(json.error ?? "Erro ao enviar.");
        return;
      }
      setResultado(json.mensagem);
    } catch {
      setResultado("Falha de conexão.");
    } finally {
      setLoading(false);
    }
  }

  if (autorizado === null) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <p className="text-[rgba(248,246,240,0.6)]">Carregando...</p>
      </div>
    );
  }

  if (!autorizado) {
    return (
      <div className="px-6 pt-32 pb-24">
        <div className="mx-auto max-w-xl text-center">
          <ImagemConteudo
            src={IMAGENS.formacao.src}
            alt={IMAGENS.formacao.alt}
            credito={IMAGENS.formacao.credito}
            className="mb-8"
          />
          <div className="card-sacred rounded-sm p-10">
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl text-[var(--pure-white)]">
              Formação reservada
            </h1>
            <p className="mt-4 text-[rgba(248,246,240,0.75)]">
              Este espaço é para quem se identifica com os princípios da RCT — entra quem
              pratica, não quem só diz que pratica. Nenhum participante tem autoridade sobre outro.
            </p>
            <p className="mt-4 text-sm text-[rgba(248,246,240,0.55)]">
              Enquanto isso, o blog e o caminho estão abertos a todos.
            </p>
            <Link href="/diagnostico" className="btn-primary mt-8 inline-flex">
              Questionário (opcional)
            </Link>
            <Link href="/caminho" className="btn-secondary mt-4 inline-flex">
              Conhecer o Caminho
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <ImagemConteudo
          src={IMAGENS.formacao.src}
          alt={IMAGENS.formacao.alt}
          credito={IMAGENS.formacao.credito}
          className="mb-8"
        />
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl text-[var(--sacred-gold)]">
          Formação reservada
        </h1>
        <p className="mt-4 text-[rgba(248,246,240,0.75)]">
          Você se identifica com este caminho. O ritmo é seu — sem pressa, sem chefia entre participantes.
        </p>
        <p className="mt-4 text-sm italic text-[rgba(248,246,240,0.55)]">
          «Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.» — Mateus 11:28
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
              {f.ref && (
                <p className="mt-2 font-[family-name:var(--font-jetbrains)] text-[10px] text-[rgba(248,246,240,0.4)]">
                  {f.ref}
                </p>
              )}
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
              placeholder="Sua reflexão (mín. 200 caracteres)..."
              value={resposta}
              onChange={(e) => setResposta(e.target.value)}
            />
            <button onClick={submeterProva} disabled={loading} className="btn-primary">
              {loading ? "Enviando..." : "Enviar reflexão"}
            </button>
            {resultado && <p className="text-sm text-[var(--sacred-gold)]">{resultado}</p>}
          </div>
        )}

        <div className="mt-10">
          <Link href="/blog?categoria=jesus-grande-yogue" className="btn-secondary">
            Começar pelo Blog →
          </Link>
        </div>
      </div>
    </div>
  );
}
