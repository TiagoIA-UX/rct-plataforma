"use client";

import { useState } from "react";

export function NewsletterBlog() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [estado, setEstado] = useState<"idle" | "loading" | "ok" | "erro">("idle");
  const [msg, setMsg] = useState("");

  async function inscrever(e: React.FormEvent) {
    e.preventDefault();
    setEstado("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, nome: nome || undefined, consentimento: true }),
      });
      const json = await res.json();
      if (res.ok) {
        setEstado("ok");
        setMsg(
          json.ja_inscrito
            ? "Você já está inscrito — fique atento à sua caixa de entrada."
            : "Inscrição confirmada. Você receberá os próximos artigos."
        );
      } else {
        setEstado("erro");
        setMsg(json.error ?? "Ocorreu um erro. Tente novamente.");
      }
    } catch {
      setEstado("erro");
      setMsg("Erro de conexão. Tente novamente.");
    }
  }

  if (estado === "ok") {
    return (
      <aside className="rct-newsletter mt-16 border border-[rgba(200,169,81,0.25)] rounded-sm p-8 text-center">
        <p className="text-[var(--sacred-gold)] font-[family-name:var(--font-cormorant)] text-xl">
          {msg}
        </p>
        <p className="mt-2 text-sm text-[rgba(248,246,240,0.5)]">
          <em>«A verdade não precisa de floreio. Precisa ser clara.»</em>
        </p>
      </aside>
    );
  }

  return (
    <aside className="rct-newsletter mt-16 border border-[rgba(200,169,81,0.25)] rounded-sm p-8">
      <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--sacred-gold)]">
        Receba os próximos artigos
      </h3>
      <p className="mt-3 text-sm text-[rgba(248,246,240,0.7)] leading-relaxed">
        Ciência do comportamento e reflexão no dia a dia — sempre com referência publicada
        e honestidade sobre prós e contras. Sem spam. Descadastramento a qualquer momento.
      </p>
      <form onSubmit={inscrever} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="nl-nome" className="sr-only">Nome (opcional)</label>
          <input
            id="nl-nome"
            type="text"
            placeholder="Seu nome (opcional)"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="input-sacred w-full"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="nl-email" className="sr-only">E-mail</label>
          <input
            id="nl-email"
            type="email"
            required
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-sacred w-full"
          />
        </div>
        <button
          type="submit"
          disabled={estado === "loading"}
          className="btn-primary shrink-0"
        >
          {estado === "loading" ? "Aguarde..." : "Inscrever"}
        </button>
      </form>
      {estado === "erro" && (
        <p className="mt-3 text-sm text-red-400">{msg}</p>
      )}
      <p className="mt-4 text-[10px] text-[rgba(248,246,240,0.3)]">
        Ao se inscrever, você concorda com nossa{" "}
        <a href="/privacidade" className="underline">Política de Privacidade</a>.
        Nenhum dado pessoal identificável é compartilhado com terceiros.
      </p>
    </aside>
  );
}
