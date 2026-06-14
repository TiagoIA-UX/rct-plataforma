import type { Metadata } from "next";
import Link from "next/link";
import { CategoriaEmConstrucao } from "@/components/blog/CategoriaEmConstrucao";
import { ImagemConteudo } from "@/components/shared/ImagemConteudo";
import { CATEGORIA_LABELS, CATEGORIA_EM_CONSTRUCAO } from "@/lib/categorias";
import { IMAGENS } from "@/lib/imagens";
import { MARCA_NOME } from "@/lib/identidade";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: CATEGORIA_LABELS[CATEGORIA_EM_CONSTRUCAO],
  description: `Série em desenvolvimento — Escritura e neurociência com rigor. Colabore com ${MARCA_NOME}.`,
};

export default function BibliaNeurocientificaPage() {
  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <ImagemConteudo
          src={IMAGENS.blog.src}
          alt="Luz e consciência — estudo bíblico e ciência"
          credito={IMAGENS.blog.credito}
          className="mb-10"
        />
        <Link
          href="/blog"
          className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)] hover:opacity-80"
        >
          ← Voltar ao blog
        </Link>
        <CategoriaEmConstrucao className="mt-6" />
      </div>
    </div>
  );
}
