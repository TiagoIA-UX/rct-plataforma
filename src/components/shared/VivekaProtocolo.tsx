import { PERGUNTAS_VIVEKA, RESULTADO_VIVEKA, SINAL_ATIVACAO_VIVEKA } from "@/lib/viveka";

export function VivekaProtocolo() {
  return (
    <section className="card-sacred rounded-sm px-6 py-8">
      <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
        5 perguntas de honestidade
      </p>
      <p className="mt-4 text-sm text-[rgba(248,246,240,0.75)]">{SINAL_ATIVACAO_VIVEKA}</p>
      <ol className="mt-8 space-y-6">
        {PERGUNTAS_VIVEKA.map((p) => (
          <li key={p.id} className="text-sm">
            <p className="font-[family-name:var(--font-cormorant)] text-lg text-[var(--pure-white)]">
              {p.id}. {p.pergunta}
            </p>
            <p className="mt-2 text-[rgba(248,246,240,0.55)]">{p.ensinamento}</p>
          </li>
        ))}
      </ol>
      <ul className="mt-8 space-y-2 text-xs text-[rgba(248,246,240,0.5)]">
        <li>{RESULTADO_VIVEKA.prosseguir}</li>
        <li>{RESULTADO_VIVEKA.pausar}</li>
        <li>{RESULTADO_VIVEKA.parar}</li>
      </ul>
    </section>
  );
}
