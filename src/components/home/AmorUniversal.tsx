import Link from "next/link";
import { IMAGENS } from "@/lib/imagens";

export function AmorUniversal() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.25em] text-[var(--sacred-gold)]">
          Temperança, ciência e fé
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl text-[var(--pure-white)] md:text-5xl">
          Daniel e os companheiros: sabedoria onde ciência e fé se encontram
        </h2>

        <div className="mt-8 overflow-hidden rounded-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGENS.amorUniversal.src}
                alt={IMAGENS.amorUniversal.alt}
            className="aspect-[21/9] w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="mt-8 space-y-5 text-[rgba(248,246,240,0.85)]">
          <blockquote className="border-l-2 border-[var(--sacred-gold)] pl-5">
            <p className="font-[family-name:var(--font-cormorant)] text-lg italic">
              &ldquo;Em toda a matéria de sabedoria e de entendimento sobre que o rei lhes
              perguntou, os achou dez vezes melhores do que todos os magos e encantadores que
              havia em todo o seu reino.&rdquo;
            </p>
            <cite className="mt-2 block text-xs text-[rgba(248,246,240,0.5)] not-italic">
              — Daniel 1:20
            </cite>
          </blockquote>

          <p>
            No livro de Daniel, ele e seus companheiros recusam os manjares e o vinho do rei da
            Babilônia e pedem para comer apenas legumes e beber água por dez dias (Daniel 1:8-16).
            Ao fim, aparecem mais saudáveis — e, em sabedoria e entendimento, o rei os encontra
            &ldquo;dez vezes melhores&rdquo; que todos os magos e encantadores de todo o seu reino
            (Daniel 1:17-20). O próprio texto atribui essa sabedoria a Deus; a temperança e o
            respeito à vida caminham junto — comer só vegetais é também cuidado com os animais e
            com o próprio corpo.
          </p>

          <p>
            Como paralelo científico — não como prova do relato — a pesquisa moderna estudou esse
            padrão alimentar. Um ensaio sobre o chamado &ldquo;Daniel Fast&rdquo; (21 dias à base de
            vegetais) observou melhora em marcadores cardiometabólicos.{" "}
            <span className="text-xs text-[rgba(248,246,240,0.5)]">
              [Bloomer et al., 2010 — Lipids in Health and Disease] [ESTABELECIDA]
            </span>{" "}
            Estudos sobre jejum e restrição alimentar associam esses estados a maior BDNF e
            neuroplasticidade — base biológica plausível para foco e clareza mental, ainda em
            investigação quanto à cognição humana.{" "}
            <span className="text-xs text-[rgba(248,246,240,0.5)]">
              [Mattson — Nature Reviews Neuroscience, 2018] [EM INVESTIGAÇÃO]
            </span>
          </p>
        </div>

        <div className="relative z-10 mt-10 flex flex-wrap gap-4">
          <Link href="/blog?categoria=milagres-decodificados" className="btn-secondary">
            Milagres Decodificados
          </Link>
          <Link href="/blog/mateus-transformacao" className="btn-secondary">
            Mateus: Mapa da Transformação →
          </Link>
        </div>
      </div>
    </section>
  );
}
