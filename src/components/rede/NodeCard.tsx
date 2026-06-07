const TERRITORIO_LABELS: Record<string, string> = {
  saude: "Saúde",
  educacao: "Educação",
  ciencia_tecnologia: "Ciência e Tecnologia",
  arte_comunicacao: "Arte e Comunicação",
  lideranca: "Liderança",
  familia_comunidade: "Família e Comunidade",
};

interface Props {
  nome: string;
  territorio: string;
  frase?: string;
}

export function NodeCard({ nome, territorio, frase }: Props) {
  return (
    <article className="card-sacred rounded-sm p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-gold font-[family-name:var(--font-cormorant)] text-xl text-[var(--cosmic-dark)]">
          {nome.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="text-lg text-[var(--pure-white)]">{nome}</h3>
          <p className="font-[family-name:var(--font-jetbrains)] text-xs text-[var(--sacred-gold)]">
            {TERRITORIO_LABELS[territorio] ?? territorio}
          </p>
        </div>
      </div>
      {frase && (
        <p className="mt-4 text-sm italic text-[rgba(248,246,240,0.7)]">&ldquo;{frase}&rdquo;</p>
      )}
    </article>
  );
}
