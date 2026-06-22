import Link from "next/link";
import { AvisoLeituraComplementar } from "@/components/shared/AvisoLeituraComplementar";
import { PalavraEtimologia } from "@/components/shared/PalavraEtimologia";
import { IMAGENS } from "@/lib/imagens";
import { MARCA_NOME, MARCA_PRINCIPIO_CENTRAL } from "@/lib/identidade";

export function JesusOMestre() {
  return (
    <section className="px-6 py-24 gradient-life">
      <div className="mx-auto max-w-4xl">
        <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.25em] text-[var(--sacred-gold)]">
          Transformação humana
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl text-[var(--pure-white)] md:text-5xl">
          Jesus: educador de consciência e reformador comportamental
        </h2>

        <blockquote className="mt-8 border-l-2 border-[var(--sacred-gold)] pl-5">
          <p className="font-[family-name:var(--font-cormorant)] text-lg italic text-[rgba(248,246,240,0.85)] leading-relaxed">
            {MARCA_PRINCIPIO_CENTRAL}
          </p>
        </blockquote>

        <div className="mt-8 overflow-hidden rounded-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGENS.milagres.src}
            alt="Luz sobre as montanhas — presença e consciência"
            className="aspect-[21/9] w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="mt-8 space-y-5 text-[rgba(248,246,240,0.85)]">
          <p>
            O {MARCA_NOME} não é religião, seita nem apologética. Investiga o que os relatos
            evangélicos registram sobre mudança de consciência, coerência entre pensamento e ação,
            e desafio a sistemas que geram culpa crônica e medo — incluindo fariseus e escribas
            como metáforas de opressão psicológica e condicionamento coletivo.
          </p>
          <p>
            Aos 12 anos no Templo (Lucas 2:46-47), Jesus aparece em estado de atenção plena e
            clareza. A neurociência descreve estados semelhantes de{" "}
            <PalavraEtimologia id="oracao contemplativa">atenção sustentada</PalavraEtimologia>{" "}
            e regulação emocional — como hipótese interpretativa, não como prova de poder
            sobrenatural.{" "}
            <span className="text-xs text-[rgba(248,246,240,0.5)]">
              [Newberg &amp; Waldman, 2009; Lazar et al., 2005] [ESTABELECIDA]
            </span>
          </p>
          <p>
            Parábolas funcionam como ferramentas de reestruturação cognitiva e mudança de
            comportamento — como na história dos dois filhos: um disse que ia e não foi; o outro
            disse que não ia e foi (Mateus 21:28-31). O foco não é observar Jesus de longe —
            é reconhecer que transformação profunda é possível também hoje.
          </p>
          <p className="text-[var(--sacred-gold)]">
            Milagres são analisados com múltiplas lentes — histórica, simbólica, psicológica,
            psicossomática, comportamental e espiritual — sem reduzir tudo automaticamente a
            doença mental e sem apresentar hipóteses como fatos.
          </p>
        </div>

        <AvisoLeituraComplementar className="mt-8" />
        <Link href="/blog?categoria=jesus-transformacao" className="btn-primary mt-10 inline-block">
          Jesus: Educador de Consciência →
        </Link>
      </div>
    </section>
  );
}
