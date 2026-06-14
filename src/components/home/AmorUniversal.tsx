import Link from "next/link";
import { PalavraEtimologia } from "@/components/shared/PalavraEtimologia";
import { IMAGENS } from "@/lib/imagens";
import { MARCA_AMOR_UNIVERSAL } from "@/lib/identidade";

export function AmorUniversal() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.25em] text-[var(--sacred-gold)]">
          Amor vivido em ações
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl text-[var(--pure-white)] md:text-5xl">
          Amor universal — próximo, natureza e animais
        </h2>
        <p className="mt-6 text-lg text-[rgba(248,246,240,0.8)]">{MARCA_AMOR_UNIVERSAL}</p>

        <div className="mt-8 overflow-hidden rounded-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGENS.amorUniversal.src}
            alt="Paisagem serena — cuidado da criação"
            className="aspect-[21/9] w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="mt-8 space-y-5 text-[rgba(248,246,240,0.85)]">
          <blockquote className="border-l-2 border-[var(--sacred-gold)] pl-5">
            <p className="font-[family-name:var(--font-cormorant)] text-lg italic">
              &ldquo;Quando os gentios, que não têm a lei, praticam naturalmente o que ela ordena,
              tornam-se lei para si mesmos.&rdquo;
            </p>
            <cite className="mt-2 block text-xs text-[rgba(248,246,240,0.5)] not-italic">
              — Romanos 2:14 (São Paulo)
            </cite>
          </blockquote>

          <p>
            <PalavraEtimologia id="sao-francisco">São Francisco de Assis</PalavraEtimologia>{" "}
            ensinou com o corpo e com a vida: irmãos sol e lua, irmãos pássaros, irmã Mãe Terra.
            O Papa Francisco, na encíclica <em>Laudato si&apos;</em>, retoma esse chamado ao cuidado
            da casa comum — justiça social e ambiental como um só dever.
          </p>

          <p>
            Hoje, pessoas de diferentes origens agem pelo mesmo princípio — mesmo sem carregar o
            nome cristão. <PalavraEtimologia id="greta">Greta Thunberg</PalavraEtimologia> tornou-se
            símbolo público de ação climática: não por título religioso, mas por obra concreta a favor
            da criação. Paulo e Isaías apontam o mesmo:
            muitos não têm a lei escrita, mas a praticam — e serão justificados pela ação, não pelo
            rótulo (Romanos 2:13-15; cf. Isaías 56).
          </p>

          <p className="text-[var(--sacred-gold)]">
            Todos podemos ser <PalavraEtimologia id="santo">santos</PalavraEtimologia> no sentido
            bíblico — consagrados a Deus pela prática — se seguirmos os ensinamentos de Jesus e os
            colocarmos em obra, como tantos fazem mesmo sem se declarar cristãos.
          </p>
        </div>

        <div className="relative z-10 mt-10 flex flex-wrap gap-4">
          <Link href="/blog?categoria=misticismo-decodificado" className="btn-secondary">
            Símbolos explicados
          </Link>
          <Link href="/blog/biblia-neurocientifica" className="btn-secondary">
            Bíblia neurocientífica →
          </Link>
        </div>
      </div>
    </section>
  );
}
