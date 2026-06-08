import { CITACOES_PARALELAS } from "@/lib/citacoes-paralelas";

interface Props {
  /** Índice do par (0–4). Se omitido, usa hash do slug para variar */
  indice?: number;
  slug?: string;
}

function indiceParaSlug(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h + slug.charCodeAt(i)) % CITACOES_PARALELAS.length;
  return h;
}

export function CitacaoParalela({ indice, slug }: Props) {
  const idx =
    indice ?? (slug ? indiceParaSlug(slug) : 0);
  const par = CITACOES_PARALELAS[idx % CITACOES_PARALELAS.length];

  return (
    <aside className="mt-16 border-t border-[rgba(200,169,81,0.25)] pt-10">
      <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
        Citação paralela
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <blockquote className="card-sacred rounded-sm p-6">
          <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-widest text-[var(--sacred-gold)]">
            Jesus
          </p>
          <p className="mt-3 font-[family-name:var(--font-cormorant)] text-xl italic text-[var(--pure-white)]">
            &ldquo;{par.jesus.texto}&rdquo;
          </p>
          <p className="mt-2 text-xs text-[rgba(248,246,240,0.5)]">{par.jesus.referencia}</p>
        </blockquote>
        <blockquote className="card-sacred rounded-sm p-6">
          <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-widest text-[var(--sacred-gold)]">
            Patanjali
          </p>
          <p className="mt-3 font-[family-name:var(--font-cormorant)] text-xl italic text-[var(--pure-white)]">
            &ldquo;{par.patanjali.texto}&rdquo;
          </p>
          <p className="mt-2 text-xs text-[rgba(248,246,240,0.5)]">{par.patanjali.referencia}</p>
        </blockquote>
      </div>
      <p className="mt-6 text-sm text-[rgba(248,246,240,0.75)]">{par.decodificacao}</p>
    </aside>
  );
}
