import type { Metadata } from "next";
import Link from "next/link";
import { CategoriaEmConstrucao } from "@/components/blog/CategoriaEmConstrucao";
import { ImagemConteudo } from "@/components/shared/ImagemConteudo";
import { CAPITULOS_MATEUS } from "@/lib/mateus-modulo";
import { MODULO_MATEUS_TITULO, SERIE_EVANGELHOS } from "@/lib/decodificacao-humana";
import { CATEGORIA_EM_CONSTRUCAO, CATEGORIA_LABELS } from "@/lib/categorias";
import { IMAGENS } from "@/lib/imagens";
import { MARCA_NOME } from "@/lib/identidade";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: MODULO_MATEUS_TITULO,
  description: `${SERIE_EVANGELHOS} — ${MARCA_NOME}. 28 capítulos, 3 artigos cada: decodificação principal, sofrimento e florescimento.`,
};

export default function MateusTransformacaoPage() {
  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <ImagemConteudo
          src={IMAGENS.blog.src}
          alt="Evangelhos da Transformação Humana — estudo e prática"
          credito={IMAGENS.blog.credito}
          className="mb-10"
        />
        <Link
          href="/blog"
          className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)] hover:opacity-80"
        >
          ← Voltar ao blog
        </Link>

        <p className="mt-6 font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
          {SERIE_EVANGELHOS}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl text-[var(--pure-white)]">
          {CATEGORIA_LABELS[CATEGORIA_EM_CONSTRUCAO]}
        </h1>
        <p className="mt-4 text-[rgba(248,246,240,0.75)] leading-relaxed">
          Biblioteca de casos de transformação humana — não comentário religioso tradicional.
          Cada capítulo gera três artigos: decodificação principal, foco em sofrimento e foco em
          florescimento. Equilíbrio editorial: 50% compreensão / 50% desenvolvimento.
        </p>

        <ol className="mt-8 space-y-2 text-sm text-[rgba(248,246,240,0.65)]">
          {CAPITULOS_MATEUS.map((c) => (
            <li key={c.numero}>
              <span className="text-[var(--sacred-gold)]">Cap. {c.numero}</span> — {c.titulo}{" "}
              <span className="opacity-60">({c.referencia_ancora})</span>
            </li>
          ))}
        </ol>

        <CategoriaEmConstrucao className="mt-10" />
      </div>
    </div>
  );
}
