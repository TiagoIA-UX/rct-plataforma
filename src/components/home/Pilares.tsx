import { citacao } from "@/lib/referencias";

const pilares = [
  {
    numero: "01",
    titulo: "Memória e transformação",
    descricao:
      "O cérebro muda com a prática (Kandel) — experiências repetidas moldam hábitos e reações. Base científica para entender mudança interior ao longo do tempo.",
    ref: citacao("neuroplasticidade"),
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="18" />
        <path d="M24 12v12l8 6" />
      </svg>
    ),
  },
  {
    numero: "02",
    titulo: "Emoção e serenidade",
    descricao:
      "O controle das emoções (Gross; LeDoux) descreve como a mente regula afeto e impulso — linguagem da ciência do comportamento que dialoga com o ideal de paz descrito no Evangelho.",
    ref: citacao("regulacao"),
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 6c-8 8-14 16-14 24a14 14 0 0028 0c0-8-6-16-14-24z" />
      </svg>
    ),
  },
  {
    numero: "03",
    titulo: "Vínculo e comunidade",
    descricao:
      "Estudos em saúde pública (Holt-Lunstad et al.) associam relações de apoio a melhor bem-estar — ponte entre ciência das relações e a caridade vivida em rede.",
    ref: citacao("vinculos"),
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="16" r="6" />
        <circle cx="12" cy="36" r="4" />
        <circle cx="36" cy="36" r="4" />
        <path d="M24 22v8M18 32l6-6 6 6" />
      </svg>
    ),
  },
  {
    numero: "04",
    titulo: "Prática contemplativa",
    descricao:
      "Yoga, meditação e oração contemplativa associam-se a mudanças cerebrais mensuráveis (Lazar et al.) — atenção e serenidade que despertam a presença interior. Caminho prático para viver a fé no corpo, não só na ideia.",
    ref: citacao("meditacao"),
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="13" r="5" />
        <path d="M24 18c-6 3-10 9-10 16h20c0-7-4-13-10-16z" />
        <path d="M14 34c-4 0-7-2-8-5M34 34c4 0 7-2 8-5" />
      </svg>
    ),
  },
];

export function Pilares() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-[family-name:var(--font-cormorant)] text-4xl text-[var(--sacred-gold)]">
          Ciência e prática da transformação
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[rgba(248,246,240,0.7)]">
          Neuroteologia, psicologia, vínculo e prática contemplativa — eixos que unem ciência e fé: yoga, meditação e oração para serenar a mente e despertar a presença interior — leitura simbólica do Cristo que habita em nós{" "}
          <cite className="not-italic text-[var(--sacred-gold)]">[João 17:21]</cite>: o sagrado buscado dentro, não fora; interpretação, não dogma.
        </p>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pilares.map((pilar) => (
            <article key={pilar.numero} className="card-sacred rounded-sm p-8">
              <div className="text-[var(--sacred-gold)]">{pilar.icon}</div>
              <p className="mt-4 font-[family-name:var(--font-jetbrains)] text-xs text-[var(--sacred-gold)]">
                {pilar.numero}
              </p>
              <h3 className="mt-2 text-2xl text-[var(--pure-white)]">{pilar.titulo}</h3>
              <p className="mt-4 text-[rgba(248,246,240,0.75)]">{pilar.descricao}</p>
              <p className="mt-3 font-[family-name:var(--font-jetbrains)] text-[10px] text-[rgba(248,246,240,0.4)]">
                {pilar.ref}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
