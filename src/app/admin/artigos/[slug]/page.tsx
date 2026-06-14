"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CATEGORIA_LABELS, CATEGORIAS_BLOG } from "@/lib/rct-blog";

interface Artigo {
  id: string;
  slug: string;
  titulo: string;
  subtitulo: string | null;
  categoria: string;
  nivel: string;
  tags: string[];
  meta_descricao: string | null;
  tempo_leitura: string | null;
  conteudo_html: string;
  image_url: string | null;
  image_credit: string | null;
  social_instagram: string | null;
  social_facebook: string | null;
  social_linkedin: string | null;
  social_twitter: string | null;
  publicado: boolean;
  pendente_revisao: boolean;
  created_at: string;
}

type Estado = "idle" | "loading" | "salvando" | "ok" | "erro";

export default function EditorArtigoPage() {
  const params = useParams<{ slug: string }>();
  const [password, setPassword] = useState("");
  const [autenticado, setAutenticado] = useState(false);
  const [artigo, setArtigo] = useState<Artigo | null>(null);
  const [estado, setEstado] = useState<Estado>("idle");
  const [msg, setMsg] = useState("");

  const [draft, setDraft] = useState({
    titulo: "",
    subtitulo: "",
    categoria: "",
    nivel: "abertura",
    tags: "",
    meta_descricao: "",
    tempo_leitura: "",
    image_url: "",
    image_credit: "",
    social_instagram: "",
    social_facebook: "",
    social_linkedin: "",
    social_twitter: "",
    conteudo_html: "",
  });

  useEffect(() => {
    if (autenticado && params.slug) {
      void carregarArtigo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autenticado, params.slug]);

  async function carregarArtigo() {
    setEstado("loading");
    const res = await fetch(`/api/admin?tab=artigos`, {
      headers: { Authorization: `Bearer ${password}` },
    });
    if (!res.ok) { setEstado("erro"); setMsg("Não autorizado."); return; }
    const json = await res.json();
    const found = (json.artigos as Artigo[]).find((a) => a.slug === params.slug);
    if (!found) { setEstado("erro"); setMsg("Artigo não encontrado."); return; }
    setArtigo(found);
    setDraft({
      titulo: found.titulo,
      subtitulo: found.subtitulo ?? "",
      categoria: found.categoria,
      nivel: found.nivel ?? "abertura",
      tags: found.tags.join(", "),
      meta_descricao: found.meta_descricao ?? "",
      tempo_leitura: found.tempo_leitura ?? "",
      image_url: found.image_url ?? "",
      image_credit: found.image_credit ?? "",
      social_instagram: found.social_instagram ?? "",
      social_facebook: found.social_facebook ?? "",
      social_linkedin: found.social_linkedin ?? "",
      social_twitter: found.social_twitter ?? "",
      conteudo_html: found.conteudo_html,
    });
    setEstado("idle");
  }

  async function salvar(acao?: "publicar" | "despublicar" | "revisar") {
    if (!artigo) return;
    setEstado("salvando");
    setMsg("");
    const res = await fetch("/api/admin", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${password}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tipo: "artigo",
        slug: artigo.slug,
        status: acao ?? "atualizar",
        titulo: draft.titulo.trim(),
        subtitulo: draft.subtitulo.trim() || null,
        categoria: draft.categoria,
        nivel: draft.nivel,
        tags: draft.tags.split(",").map((t) => t.trim()).filter(Boolean),
        meta_descricao: draft.meta_descricao.trim() || null,
        tempo_leitura: draft.tempo_leitura.trim() || null,
        image_url: draft.image_url.trim() || null,
        image_credit: draft.image_credit.trim() || null,
        social_instagram: draft.social_instagram.trim() || null,
        social_facebook: draft.social_facebook.trim() || null,
        social_linkedin: draft.social_linkedin.trim() || null,
        social_twitter: draft.social_twitter.trim() || null,
        conteudo_html: draft.conteudo_html,
      }),
    });

    if (res.ok) {
      const updated = await res.json();
      setArtigo(updated);
      setEstado("ok");
      setMsg(
        acao === "publicar"
          ? "Artigo publicado com sucesso."
          : acao === "despublicar"
          ? "Artigo despublicado."
          : acao === "revisar"
          ? "Artigo movido para fila de revisão."
          : "Artigo atualizado."
      );
    } else {
      setEstado("erro");
      setMsg("Falha ao salvar. Verifique a conexão.");
    }
  }

  if (!autenticado) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 pt-24">
        <div className="card-sacred w-full max-w-md rounded-sm p-8">
          <h1 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--sacred-gold)]">
            Editor de Artigo — RCT
          </h1>
          <input
            type="password"
            placeholder="Senha de administrador"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setAutenticado(true)}
            className="input-sacred mt-6"
          />
          <button
            onClick={() => setAutenticado(true)}
            className="btn-primary mt-4 w-full"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  if (estado === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-[var(--sacred-gold)]">Carregando artigo…</p>
      </div>
    );
  }

  if (!artigo) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-400">{msg || "Artigo não encontrado."}</p>
      </div>
    );
  }

  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/admin" className="text-sm text-[rgba(248,246,240,0.5)] hover:text-[var(--sacred-gold)]">
            ← Painel Admin
          </Link>
          <span className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[rgba(248,246,240,0.3)]">
            {artigo.publicado ? "Publicado" : artigo.pendente_revisao ? "Aguardando revisão" : "Rascunho"}
          </span>
        </div>

        <h1 className="font-[family-name:var(--font-cormorant)] text-3xl text-[var(--sacred-gold)] mb-8">
          Editor de Artigo
        </h1>

        {msg && (
          <div className={`mb-6 rounded-sm p-4 text-sm ${estado === "ok" ? "bg-[rgba(74,124,89,0.2)] text-[#7ecf9a]" : "bg-[rgba(200,50,50,0.2)] text-red-300"}`}>
            {msg}
          </div>
        )}

        <div className="space-y-6">
          {/* Dados básicos */}
          <section className="card-sacred rounded-sm p-6 space-y-4">
            <h2 className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
              Informações do artigo
            </h2>

            <div>
              <label className="block text-xs text-[rgba(248,246,240,0.5)] mb-1">Título</label>
              <input
                value={draft.titulo}
                onChange={(e) => setDraft({ ...draft, titulo: e.target.value })}
                className="input-sacred w-full"
              />
            </div>

            <div>
              <label className="block text-xs text-[rgba(248,246,240,0.5)] mb-1">Subtítulo</label>
              <input
                value={draft.subtitulo}
                onChange={(e) => setDraft({ ...draft, subtitulo: e.target.value })}
                className="input-sacred w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[rgba(248,246,240,0.5)] mb-1">Categoria</label>
                <select
                  value={draft.categoria}
                  onChange={(e) => setDraft({ ...draft, categoria: e.target.value })}
                  className="input-sacred w-full"
                >
                  {CATEGORIAS_BLOG.map((c) => (
                    <option key={c} value={c}>{CATEGORIA_LABELS[c]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[rgba(248,246,240,0.5)] mb-1">Nível</label>
                <select
                  value={draft.nivel}
                  onChange={(e) => setDraft({ ...draft, nivel: e.target.value })}
                  className="input-sacred w-full"
                >
                  <option value="abertura">Abertura (público)</option>
                  <option value="aprofundamento">Aprofundamento</option>
                  <option value="membros">Membros</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[rgba(248,246,240,0.5)] mb-1">Tags (vírgula)</label>
                <input
                  value={draft.tags}
                  onChange={(e) => setDraft({ ...draft, tags: e.target.value })}
                  placeholder="ahimsa, epigenética, neurociência"
                  className="input-sacred w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-[rgba(248,246,240,0.5)] mb-1">Tempo de leitura</label>
                <input
                  value={draft.tempo_leitura}
                  onChange={(e) => setDraft({ ...draft, tempo_leitura: e.target.value })}
                  placeholder="8 min de leitura"
                  className="input-sacred w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[rgba(248,246,240,0.5)] mb-1">Meta descrição (SEO)</label>
              <textarea
                value={draft.meta_descricao}
                onChange={(e) => setDraft({ ...draft, meta_descricao: e.target.value })}
                rows={2}
                className="input-sacred w-full"
              />
            </div>
          </section>

          {/* Imagem */}
          <section className="card-sacred rounded-sm p-6 space-y-4">
            <h2 className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
              Imagem de capa
            </h2>
            <div>
              <label className="block text-xs text-[rgba(248,246,240,0.5)] mb-1">URL da imagem (Unsplash ou outro)</label>
              <input
                value={draft.image_url}
                onChange={(e) => setDraft({ ...draft, image_url: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="input-sacred w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-[rgba(248,246,240,0.5)] mb-1">Crédito da imagem</label>
              <input
                value={draft.image_credit}
                onChange={(e) => setDraft({ ...draft, image_credit: e.target.value })}
                placeholder="Unsplash — Autor"
                className="input-sacred w-full"
              />
            </div>
            {draft.image_url && (
              <div className="mt-2 aspect-[21/9] w-full overflow-hidden rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={draft.image_url} alt="Preview" className="h-full w-full object-cover" />
              </div>
            )}
          </section>

          {/* Conteúdo */}
          <section className="card-sacred rounded-sm p-6">
            <h2 className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)] mb-4">
              Conteúdo HTML
            </h2>
            <textarea
              value={draft.conteudo_html}
              onChange={(e) => setDraft({ ...draft, conteudo_html: e.target.value })}
              rows={20}
              className="input-sacred w-full font-mono text-sm"
            />
          </section>

          {/* Redes sociais */}
          <section className="card-sacred rounded-sm p-6 space-y-4">
            <h2 className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
              Textos para redes sociais
            </h2>
            <p className="text-xs text-[rgba(248,246,240,0.4)]">
              Estes textos ficam disponíveis para o administrador copiar. Publicação manual ou automática
              conforme configuração da plataforma.
            </p>

            {(["social_instagram", "social_facebook", "social_linkedin", "social_twitter"] as const).map((rede) => (
              <div key={rede}>
                <label className="block text-xs text-[rgba(248,246,240,0.5)] mb-1 capitalize">
                  {rede.replace("social_", "").charAt(0).toUpperCase() + rede.replace("social_", "").slice(1)}
                </label>
                <textarea
                  value={draft[rede]}
                  onChange={(e) => setDraft({ ...draft, [rede]: e.target.value })}
                  rows={4}
                  className="input-sacred w-full text-sm"
                />
              </div>
            ))}
          </section>

          {/* Ações */}
          <section className="flex flex-wrap gap-3 justify-end">
            <button
              type="button"
              onClick={() => salvar()}
              disabled={estado === "salvando"}
              className="btn-secondary"
            >
              {estado === "salvando" ? "Salvando…" : "Salvar rascunho"}
            </button>
            {!artigo.publicado && (
              <button
                type="button"
                onClick={() => salvar("revisar")}
                disabled={estado === "salvando"}
                className="btn-secondary"
              >
                Enviar para revisão
              </button>
            )}
            {artigo.publicado ? (
              <button
                type="button"
                onClick={() => salvar("despublicar")}
                disabled={estado === "salvando"}
                className="btn-secondary"
              >
                Despublicar
              </button>
            ) : (
              <button
                type="button"
                onClick={() => salvar("publicar")}
                disabled={estado === "salvando"}
                className="btn-primary"
              >
                Publicar
              </button>
            )}
          </section>

          <p className="text-center text-[10px] text-[rgba(248,246,240,0.2)]">
            Artigos das categorias <em>Prompts do Grande Mestre</em> e <em>Epigenética Sagrada</em>{" "}
            exigem revisão humana antes da publicação — Salvaguarda 0.7.
          </p>
        </div>
      </div>
    </div>
  );
}
