import Link from "next/link";
import { CATEGORIA_LABELS, CATEGORIA_EM_CONSTRUCAO } from "@/lib/categorias";
import { MARCA_NOME } from "@/lib/identidade";

type Props = {
  className?: string;
};

/** Mensagem para categorias em desenvolvimento — convite à colaboração */
export function CategoriaEmConstrucao({ className = "" }: Props) {
  const titulo = CATEGORIA_LABELS[CATEGORIA_EM_CONSTRUCAO];

  return (
    <div className={`card-sacred mt-12 rounded-sm p-8 md:p-10 ${className}`.trim()}>
      <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
        Em construção — neuroteologia com rigor
      </p>
      <h2 className="mt-4 font-[family-name:var(--font-cormorant)] text-3xl text-[var(--pure-white)]">
        {titulo}
      </h2>
      <p className="mt-6 text-[rgba(248,246,240,0.8)] leading-relaxed">
        Estamos desenvolvendo uma série que une Escritura, estudos neurocientíficos publicados e
        tradição contemplativa cristã — sempre com referências verificáveis e honestidade sobre o
        que é ciência estabelecida e o que é hipótese.
      </p>
      <p className="mt-4 text-[rgba(248,246,240,0.75)] leading-relaxed">
        <strong className="text-[var(--sacred-gold)]">Precisamos da sua ajuda.</strong> Se você
        pesquisa, escreve, revisa textos bíblicos ou trabalha com neurociência da espiritualidade,
        sua contribuição é bem-vinda. Publicaremos conforme o tempo e a revisão permitirem — cada
        artigo seguirá a estrutura Paulo (dados, hipóteses, prática, bênção/maldição, base científica).
      </p>
      <blockquote className="mt-6 border-l-2 border-[var(--sacred-gold)] pl-5 text-sm italic text-[rgba(248,246,240,0.7)]">
        «Para que todos sejam um.» — João 17:21
      </blockquote>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/contribuir" className="btn-primary">
          Quero ajudar — Contribuir
        </Link>
        <Link href="/blog" className="btn-secondary">
          Ver artigos publicados
        </Link>
      </div>
      <p className="mt-6 text-xs text-[rgba(248,246,240,0.45)]">
        {MARCA_NOME} — transparência, consentimento e respeito ao visitante.
      </p>
    </div>
  );
}
