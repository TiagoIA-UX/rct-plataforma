"use client";

import { useState } from "react";
import { MARCA_NOME } from "@/lib/identidade";

export function ContribuicaoForm() {
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErro(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contribuicoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          autor_email: formData.get("autor_email"),
          autor_nome: formData.get("autor_nome") || undefined,
          tipo: formData.get("tipo"),
          titulo: formData.get("titulo"),
          conteudo: formData.get("conteudo"),
          referencia_cientifica: formData.get("referencia_cientifica") || undefined,
          modulo_relacionado: formData.get("modulo_relacionado") || undefined,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        setErro(json.error ?? "Erro ao submeter.");
        return;
      }

      setSucesso(true);
      form.reset();
    } catch {
      setErro("Falha de conexão.");
    } finally {
      setLoading(false);
    }
  }

  if (sucesso) {
    return (
      <div className="card-sacred rounded-sm p-8 text-center">
        <p className="text-xl text-[var(--sacred-gold)]">Contribuição submetida para análise.</p>
        <p className="mt-4 text-[rgba(248,246,240,0.75)]">
          {MARCA_NOME} é um projeto em constante evolução. Sua contribuição será avaliada com rigor científico.
        </p>
        <button onClick={() => setSucesso(false)} className="btn-secondary mt-6">
          Submeter outra
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-sacred space-y-6 rounded-sm p-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="label-sacred">E-mail</label>
          <input name="autor_email" type="email" required className="input-sacred" />
        </div>
        <div>
          <label className="label-sacred">Apelido (opcional)</label>
          <input name="autor_nome" type="text" className="input-sacred" />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="label-sacred">Tipo de contribuição</label>
          <select name="tipo" required className="input-sacred">
            <option value="reforco">Reforço</option>
            <option value="correcao">Correção</option>
            <option value="aperfeicoamento">Aperfeiçoamento</option>
            <option value="novo_modulo">Novo Módulo</option>
          </select>
        </div>
        <div>
          <label className="label-sacred">Módulo relacionado</label>
          <select name="modulo_relacionado" className="input-sacred">
            <option value="">Nenhum específico</option>
            <option value="fase-i">Fase I — Fundamentos</option>
            <option value="fase-ii">Fase II — Amor universal</option>
            <option value="fase-iii">Fase III — Vida e família</option>
            <option value="fase-iv">Fase IV — Rede</option>
          </select>
        </div>
      </div>
      <div>
        <label className="label-sacred">Título da contribuição</label>
        <input name="titulo" type="text" required minLength={10} className="input-sacred" />
      </div>
      <div>
        <label className="label-sacred">Desenvolvimento (mín. 200 caracteres)</label>
        <textarea name="conteudo" required minLength={200} className="input-sacred min-h-[200px] resize-y" />
      </div>
      <div>
        <label className="label-sacred">Referência científica (opcional)</label>
        <input name="referencia_cientifica" type="url" placeholder="https://..." className="input-sacred" />
      </div>
      {erro && <p className="text-sm text-red-400">{erro}</p>}
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Submetendo..." : "Submeter para Análise"}
      </button>
    </form>
  );
}
