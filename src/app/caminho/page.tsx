import type { Metadata } from "next";
import Link from "next/link";
import { ImagemConteudo } from "@/components/shared/ImagemConteudo";
import { VivekaProtocolo } from "@/components/shared/VivekaProtocolo";
import { ESSENCIA_PLATAFORMA, SECOES_CAMINHO } from "@/lib/essencia";
import { RCT_DESCRICAO_PADRAO } from "@/lib/identidade";
import { IMAGENS } from "@/lib/imagens";

/** ISR — ver CACHE_TTL.static em src/lib/cache.ts */
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "O Caminho",
  description: RCT_DESCRICAO_PADRAO,
};

export default function CaminhoPage() {
  return (
    <div className="pt-24">
      <section className="gradient-cosmos px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <ImagemConteudo
            src={IMAGENS.caminho.src}
            alt={IMAGENS.caminho.alt}
            credito={IMAGENS.caminho.credito}
            priority
            className="mb-10"
          />
          <h1 className="text-center font-[family-name:var(--font-cormorant)] text-5xl text-[var(--pure-white)] md:text-6xl">
            O Caminho
          </h1>
          <p className="mt-6 text-center text-xl text-[var(--sacred-gold)]">
            {ESSENCIA_PLATAFORMA.titulo}
          </p>
          <p className="mt-6 text-center text-[rgba(248,246,240,0.8)]">{ESSENCIA_PLATAFORMA.texto}</p>
        </div>
      </section>

      {SECOES_CAMINHO.map((secao, i) => (
        <section
          key={secao.id}
          id={secao.id}
          className={`px-6 py-20 ${i % 2 === 0 ? "" : "bg-[rgba(26,39,68,0.3)]"}`}
        >
          <div className="prose-rct mx-auto max-w-4xl">
            {secao.imagem && secao.creditoImagem && (
              <ImagemConteudo
                src={secao.imagem}
                alt={secao.titulo}
                credito={secao.creditoImagem}
                className="mb-8"
              />
            )}
            <h2>{secao.titulo}</h2>
            <p>{secao.conteudo}</p>
            {secao.ref && (
              <p className="mt-4 font-[family-name:var(--font-jetbrains)] text-xs text-[rgba(248,246,240,0.45)]">
                {secao.ref}
              </p>
            )}
          </div>
        </section>
      ))}

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <VivekaProtocolo />
        </div>
      </section>

      <section className="px-6 pb-20 text-center">
        <Link href="/blog" className="btn-primary">
          Explorar o Blog
        </Link>
        <Link href="/diagnostico" className="btn-secondary mt-4 inline-flex">
          Questionário (opcional)
        </Link>
      </section>
    </div>
  );
}
