import Link from "next/link";
import { AvisoLeituraComplementar } from "@/components/shared/AvisoLeituraComplementar";
import { IMAGENS } from "@/lib/imagens";

export function GrandeYogue() {
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
            Aos 12 anos, Jesus ensinava doutores no Templo em estado de clareza e atenção totais
            (Lucas 2:46-47). Aos 40 dias no deserto, no Monte das Oliveiras, no Getsêmani —
            a oração de Jesus era concentração plena do ser sobre Deus.
            São Paulo chamaria isso de <em>«não sou mais eu quem vivo, mas Cristo vive em mim»</em>{" "}
            (Gálatas 2:20): o eu cedendo lugar ao Deus interior que habitava nele como templo
            (1 Coríntios 6:19-20).
          </p>
          <p>
            A neurociência descreve o mesmo fenômeno com precisão: oração contemplativa
            sustentada ativa a parte do cérebro da reflexão e acalma o centro do medo —
            reduzindo reatividade e aumentando discernimento.{" "}
            <span className="text-xs text-[rgba(248,246,240,0.5)]">
              [Newberg &amp; Waldman — <em>How God Changes Your Brain</em>, 2009;
              Lazar et al. — <em>NeuroReport</em>, 2005]
            </span>
          </p>
          <p>
            A prática de oração com atenção plena — como Jesus praticava — está associada
            a ritmo cardíaco mais calmo, controle das emoções e redução do hormônio do estresse.{" "}
            <span className="text-xs text-[rgba(248,246,240,0.5)]">
              [McCraty et al. — HeartMath Institute, 2015;
              Carlson et al. — <em>Psychosomatic Medicine</em>, 2007]
            </span>
          </p>
          <p>
            Ele não veio destruir — veio unir. A linhagem de Davi, os ensinamentos do Oriente
            Médio e a sabedoria do mundo antigo reunidos em um único ser, moldado desde o
            nascimento pela herança cultural e histórica de uma linhagem de sábios.
          </p>
          <p className="text-[var(--sacred-gold)]">
            A RCT não é religião. É o reconhecimento científico de que o que Ele viveu é
            possível de imitar na prática — e que Ele mesmo disse isso:{" "}
            <em>«Maior do que estas coisas fareis.»</em>{" "}
            (João 14:12)
          </p>
        </div>

        <div className="mt-8 rounded-sm border border-[rgba(200,169,81,0.2)] p-5 text-sm text-[rgba(248,246,240,0.6)]">
          <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-widest text-[var(--sacred-gold)] mb-3">
            Para comparação — outras tradições
          </p>
          <p>
            O que o catolicismo chama de <em>oração contemplativa</em>, a tradição do yoga
            chama de <em>concentração plena</em> (textos clássicos do yoga, sutra 3.3).
            São descrições paralelas de estados que a ciência consegue medir — cada tradição
            usando sua própria linguagem para o mesmo fenômeno. Trabalhamos com a linguagem
            dos Evangelhos e com prova científica publicada.
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
