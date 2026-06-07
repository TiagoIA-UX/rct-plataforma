const pilares = [
  {
    numero: "01",
    titulo: "Ciência Verificável",
    descricao:
      "Cada ensinamento tem um mecanismo biológico. Nenhuma fábula. Nenhum dogma.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="18" />
        <path d="M24 12v12l8 6" />
      </svg>
    ),
  },
  {
    numero: "02",
    titulo: "Ahimsa Principiológica",
    descricao:
      "Não-violência não como regra — como identidade. O critério de pertencimento à rede.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 6c-8 8-14 16-14 24a14 14 0 0028 0c0-8-6-16-14-24z" />
      </svg>
    ),
  },
  {
    numero: "03",
    titulo: "Missão Territorial",
    descricao:
      "Cada membro é um nó. Cada nó tem um território. A rede se auto-organiza por ressonância.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="16" r="6" />
        <circle cx="12" cy="36" r="4" />
        <circle cx="36" cy="36" r="4" />
        <path d="M24 22v8M18 32l6-6 6 6" />
      </svg>
    ),
  },
];

export function Pilares() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-[family-name:var(--font-cormorant)] text-4xl text-[var(--sacred-gold)]">
          Os Três Pilares
        </h2>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pilares.map((pilar) => (
            <article key={pilar.numero} className="card-sacred rounded-sm p-8">
              <div className="text-[var(--sacred-gold)]">{pilar.icon}</div>
              <p className="mt-4 font-[family-name:var(--font-jetbrains)] text-xs text-[var(--sacred-gold)]">
                {pilar.numero}
              </p>
              <h3 className="mt-2 text-2xl text-[var(--pure-white)]">{pilar.titulo}</h3>
              <p className="mt-4 text-[rgba(248,246,240,0.75)]">{pilar.descricao}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
