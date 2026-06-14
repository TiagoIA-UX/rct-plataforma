import Link from "next/link";
import { AvisoLeituraComplementar } from "@/components/shared/AvisoLeituraComplementar";
import { PalavraEtimologia } from "@/components/shared/PalavraEtimologia";
import { IMAGENS } from "@/lib/imagens";
import { MARCA_NOME } from "@/lib/identidade";

export function JesusOMestre() {
  return (
    <section className="px-6 py-24 gradient-life">
      <div className="mx-auto max-w-4xl">
        <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.25em] text-[var(--sacred-gold)]">
          O Mestre
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl text-[var(--pure-white)] md:text-5xl">
          Jesus: a oração vivida, não só falada
        </h2>

        <blockquote className="mt-8 border-l-2 border-[var(--sacred-gold)] pl-5">
          <p className="font-[family-name:var(--font-cormorant)] text-xl italic text-[var(--pure-white)] leading-relaxed">
            &ldquo;Para que todos sejam um, como tu, Pai, és em mim, e eu em ti,
            para que também eles sejam um em nós.&rdquo;
          </p>
          <cite className="mt-2 block text-xs text-[rgba(248,246,240,0.5)] not-italic">
            — João 17:21
          </cite>
        </blockquote>

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
            Aos 12 anos, Jesus ensinava doutores no Templo em clareza e atenção totais
            (Lucas 2:46-47). No deserto, no Monte das Oliveiras, no Getsêmani — a oração era
            concentração plena do ser sobre Deus.
            <PalavraEtimologia id="sao"> São Paulo</PalavraEtimologia> chamaria isso de{" "}
            <em>«não sou mais eu quem vivo, mas Cristo vive em mim»</em> (Gálatas 2:20).
          </p>
          <p>
            A neurociência descreve o mesmo fenômeno com precisão:{" "}
            <PalavraEtimologia id="oracao contemplativa">oração contemplativa</PalavraEtimologia>{" "}
            sustentada ativa a reflexão e acalma o centro do medo — reduzindo reatividade e
            aumentando discernimento.{" "}
            <span className="text-xs text-[rgba(248,246,240,0.5)]">
              [Newberg &amp; Waldman, 2009; Lazar et al., 2005] [ESTABELECIDA]
            </span>
          </p>
          <p>
            {MARCA_NOME} não é uma religião nova — é o reconhecimento de que o que Ele viveu
            pode ser imitado na prática, com comprovação científica onde ela existe — e que
            Ele mesmo disse: <em>«Maior do que estas coisas fareis.»</em> (João 14:12)
          </p>
          <p className="text-[var(--sacred-gold)]">
            O que importa não é título nem discurso — são as ações. Como na parábola dos dois
            filhos: um disse que ia e não foi; o outro disse que não ia e foi (Mateus 21:28-31).
          </p>
        </div>

        <AvisoLeituraComplementar className="mt-8" />
        <Link href="/blog?categoria=jesus-grande-yogue" className="btn-primary mt-10 inline-block">
          Série Jesus o Mestre →
        </Link>
      </div>
    </section>
  );
}
