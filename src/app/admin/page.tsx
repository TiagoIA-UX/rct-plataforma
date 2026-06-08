"use client";

import { useState } from "react";

type Tab = "diagnosticos" | "triagem" | "provas" | "contribuicoes" | "metricas";

interface Diagnostico {
  id: string;
  nome: string;
  email: string;
  territorio_primario: string;
  score: number;
  nivel: string;
  created_at: string;
}

interface Contribuicao {
  id: string;
  titulo: string;
  status: string;
  autor_email: string;
  tipo: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [autenticado, setAutenticado] = useState(false);
  const [tab, setTab] = useState<Tab>("diagnosticos");
  const [dados, setDados] = useState<{
    diagnosticos?: Diagnostico[];
    contribuicoes?: Contribuicao[];
    metricas?: {
      total_diagnosticos: number;
      total_escolhidos: number;
      taxa_escolhidos: number;
    };
  }>({});
  const [loading, setLoading] = useState(false);

  async function carregar(activeTab: Tab = tab) {
    setLoading(true);
    const params = `tab=${activeTab}`;
    const res = await fetch(`/api/admin?${params}`, {
      headers: { Authorization: `Bearer ${password}` },
    });
    if (res.ok) {
      setDados(await res.json());
      setAutenticado(true);
    }
    setLoading(false);
  }

  function trocarTab(t: Tab) {
    setTab(t);
    if (autenticado) carregar(t);
  }

  async function atualizarStatus(id: string, status: string) {
    await fetch("/api/admin", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${password}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status, tipo: "contribuicao" }),
    });
    carregar("contribuicoes");
  }

  if (!autenticado) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 pt-24">
        <div className="card-sacred w-full max-w-md rounded-sm p-8">
          <h1 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--sacred-gold)]">
            Painel Admin RCT
          </h1>
          <input
            type="password"
            placeholder="Senha de administrador"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-sacred mt-6"
          />
          <button onClick={() => carregar()} disabled={loading} className="btn-primary mt-4 w-full">
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "diagnosticos", label: "Evangelização" },
    { id: "triagem", label: "Triagem Interna" },
    { id: "provas", label: "Provas" },
    { id: "contribuicoes", label: "Contribuições" },
    { id: "metricas", label: "Métricas" },
  ];

  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-[family-name:var(--font-cormorant)] text-3xl text-[var(--sacred-gold)]">
          Painel Admin
        </h1>

        <div className="mt-8 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => trocarTab(t.id)}
              className={`px-4 py-2 text-sm font-[family-name:var(--font-jetbrains)] uppercase tracking-widest ${
                tab === t.id
                  ? "bg-[var(--sacred-gold)] text-[var(--cosmic-dark)]"
                  : "border border-gold text-[var(--sacred-gold)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "metricas" && dados.metricas && (
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="card-sacred p-6">
              <p className="text-3xl text-[var(--sacred-gold)]">{dados.metricas.total_diagnosticos}</p>
              <p className="text-sm">Total de diagnósticos</p>
            </div>
            <div className="card-sacred p-6">
              <p className="text-3xl text-[var(--sacred-gold)]">{dados.metricas.total_escolhidos}</p>
              <p className="text-sm">Aptos à formação reservada</p>
            </div>
            <div className="card-sacred p-6">
              <p className="text-3xl text-[var(--sacred-gold)]">
                {dados.metricas.taxa_escolhidos.toFixed(1)}%
              </p>
              <p className="text-sm">Taxa aptos formação</p>
            </div>
          </div>
        )}

        {(tab === "diagnosticos" || tab === "triagem") && dados.diagnosticos && (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold text-left text-[var(--sacred-gold)]">
                  <th className="p-3">Nome</th>
                  <th className="p-3">Território</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Nível</th>
                  <th className="p-3">Data</th>
                </tr>
              </thead>
              <tbody>
                {dados.diagnosticos.map((d) => (
                  <tr key={d.id} className="border-b border-[rgba(200,169,81,0.1)]">
                    <td className="p-3">{d.nome}</td>
                    <td className="p-3">{d.territorio_primario}</td>
                    <td className="p-3">{d.score}</td>
                    <td className="p-3">{d.nivel}</td>
                    <td className="p-3">{new Date(d.created_at).toLocaleDateString("pt-BR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "contribuicoes" && dados.contribuicoes && (
          <div className="mt-8 space-y-4">
            {dados.contribuicoes.map((c) => (
              <div key={c.id} className="card-sacred flex items-center justify-between p-4">
                <div>
                  <p className="font-semibold">{c.titulo}</p>
                  <p className="text-sm text-[rgba(248,246,240,0.5)]">
                    {c.tipo} — {c.autor_email} — {c.status}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => atualizarStatus(c.id, "em_analise")}
                    className="btn-secondary text-xs px-2 py-1"
                  >
                    Analisar
                  </button>
                  <button
                    onClick={() => atualizarStatus(c.id, "incorporado")}
                    className="btn-primary text-xs px-2 py-1"
                  >
                    Incorporar
                  </button>
                  <button
                    onClick={() => atualizarStatus(c.id, "arquivo")}
                    className="btn-secondary text-xs px-2 py-1"
                  >
                    Arquivar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
