"use client";

import { useState } from "react";

type Variant = "full" | "compact";

type Props = {
  variant?: Variant;
  className?: string;
};

export function NewsletterForm({ variant = "full", className = "" }: Props) {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [estado, setEstado] = useState<"idle" | "loading" | "ok" | "erro">("idle");
  const [msg, setMsg] = useState("");

  async function inscrever(e: React.FormEvent) {
    e.preventDefault();
    setEstado("loading");
    setMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, nome: nome || undefined, consentimento: true }),
      });
      const json = await res.json();
      if (res.ok) {
        setEstado("ok");
        if (json.ja_inscrito) {
          setMsg(
            json.email_enviado
              ? "Você já estava inscrito — reenviamos o e-mail de boas-vindas."
              : "Você já está inscrito. Verifique sua caixa de entrada e spam."
          );
        } else if (json.email_enviado) {
          setMsg("Inscrição confirmada! Enviamos um e-mail de boas-vindas.");
        } else {
          setMsg(
            json.aviso_email ||
              "Inscrição salva. O e-mail de boas-vindas será enviado assim que o domínio estiver verificado no Resend."
          );
        }
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
      <div className={`text-center ${className}`.trim()}>
        <p className="text-[var(--sacred-gold)] font-[family-name:var(--font-cormorant)] text-lg">
          {msg}
        </p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={inscrever} className={`flex flex-col gap-2 sm:flex-row ${className}`.trim()}>
        <input
          type="email"
          required
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-sacred flex-1 text-sm"
          aria-label="E-mail para newsletter"
        />
        <button type="submit" disabled={estado === "loading"} className="btn-primary shrink-0 text-sm px-4 py-2">
          {estado === "loading" ? "…" : "Newsletter"}
        </button>
        {estado === "erro" && <p className="text-xs text-red-400 sm:basis-full">{msg}</p>}
      </form>
    );
  }

  return (
    <aside className={`border border-[rgba(200,169,81,0.25)] rounded-sm p-8 ${className}`.trim()}>
      <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--sacred-gold)]">
        Receba os próximos artigos
      </h3>
      <p className="mt-3 text-sm text-[rgba(248,246,240,0.7)] leading-relaxed">
        Aviso por e-mail quando publicarmos algo novo — sem spam. Descadastramento a qualquer momento.
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
        <button type="submit" disabled={estado === "loading"} className="btn-primary shrink-0">
          {estado === "loading" ? "Aguarde..." : "Inscrever"}
        </button>
      </form>
      {estado === "erro" && <p className="mt-3 text-sm text-red-400">{msg}</p>}
      <p className="mt-4 text-[10px] text-[rgba(248,246,240,0.3)]">
        Ao se inscrever, você concorda com nossa{" "}
        <a href="/privacidade" className="underline">Política de Privacidade</a>.
      </p>
    </aside>
  );
}
