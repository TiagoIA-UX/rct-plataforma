/**
 * Artigos publicados em JSON — fallback quando DATABASE_URL ausente ou Neon indisponível.
 * Atualizar: npm run export:artigos (após seed ou edição no admin).
 */

import artigosJson from "@/data/artigos-publicados.json";
import { normalizarCategoria, ordenarCategoriasFiltro, slugsEquivalentes } from "@/lib/categorias";

export type ArtigoRecord = {
  id: string;
  titulo: string;
  subtitulo: string | null;
  slug: string;
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
  updated_at: string;
};

function parseArtigo(raw: ArtigoRecord) {
  return {
    ...raw,
    categoria: normalizarCategoria(raw.categoria),
    created_at: new Date(raw.created_at),
    updated_at: new Date(raw.updated_at),
  };
}

const TODOS = (artigosJson as ArtigoRecord[])
  .filter((a) => a.publicado)
  .map(parseArtigo)
  .sort((a, b) => b.created_at.getTime() - a.created_at.getTime());

export function dbConfigurado(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function listarArtigosEstaticos(categoria?: string) {
  if (!categoria) return TODOS;
  const equiv = slugsEquivalentes(categoria);
  return TODOS.filter((a) => equiv.includes(a.categoria));
}

export function buscarArtigoEstaticoPorSlug(slug: string) {
  return TODOS.find((a) => a.slug === slug) ?? null;
}

export function slugsArtigosEstaticos(): string[] {
  return TODOS.map((a) => a.slug);
}

export function categoriasArtigosEstaticos(): string[] {
  return ordenarCategoriasFiltro(TODOS.map((a) => a.categoria));
}
