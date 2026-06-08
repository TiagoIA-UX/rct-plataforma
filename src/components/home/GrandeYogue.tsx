import Link from "next/link";
import { AvisoLeituraComplementar } from "@/components/shared/AvisoLeituraComplementar";
import { IMAGENS } from "@/lib/imagens";

export function GrandeYogue() {
  return (
    <section className="px-6 py-24 gradient-life">
      <div className="mx-auto max-w-4xl">
        <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.25em] text-[var(--sacred-gold)]">
          O Grande Yogue
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl text-[var(--pure-white)] md:text-5xl">
          Jesus: Samadhi em ação
        </h2>
        <div className="mt-8 overflow-hidden rounded-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGENS.milagres.src}
            alt="Luz sobre as montanhas — contemplação e presença"
            className="aspect-[21/9] w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="mt-8 space-y-5 text-[rgba(248,246,240,0.85)]">
          <p>
            Aos 12 anos, Jesus ensinava doutores no Templo em estado de clareza total — o que a
            neurociência hoje identifica como coerência neural plena, equivalente ao Samadhi
            descrito por Patanjali nos Yoga Sutras.
          </p>
          <p>
            Ele não veio abolir — veio sintetizar. A linhagem de Davi, os ensinamentos do Oriente
            Médio e a sabedoria do mundo antigo compilados em um único ser, moldado desde o
            nascimento pela herança epigenética de uma linhagem de sábios.
          </p>
          <p className="text-[var(--sacred-gold)]">
            A RCT não é religião. É o reconhecimento científico de que o que Ele viveu é
            replicável — e que Ele mesmo disse isso: «Maior do que estas coisas fareis.»
          </p>
        </div>
        <AvisoLeituraComplementar className="mt-8" />
        <Link href="/blog?categoria=jesus-grande-yogue" className="btn-primary mt-10 inline-block">
          Série Jesus o Grande Yogue →
        </Link>
      </div>
    </section>
  );
}
