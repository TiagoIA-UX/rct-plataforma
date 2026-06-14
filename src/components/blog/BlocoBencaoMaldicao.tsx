import {
  CLAUSULA_EPIGENETICA,
  exigeClausulaEpigenetica,
} from "@/lib/rct-blog";

type Props = {
  categoria: string;
  conteudoHtml: string;
};

/** Exibe cláusula epigenética quando o artigo ainda não contém o bloco v2 embutido */
export function BlocoBencaoMaldicaoFallback({ categoria, conteudoHtml }: Props) {
  const jaTemBloco = conteudoHtml.includes('data-rct-template="v2"');
  if (jaTemBloco) return null;

  const precisaClausula = exigeClausulaEpigenetica(conteudoHtml, categoria);
  if (!precisaClausula) return null;

  return (
    <aside className="mt-12 space-y-6 border-t border-gold pt-10">
      <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
        Aviso importante — herança e transformação
      </p>
      <p className="text-[rgba(248,246,240,0.85)]">{CLAUSULA_EPIGENETICA}</p>
    </aside>
  );
}
