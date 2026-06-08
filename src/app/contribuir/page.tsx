import type { Metadata } from "next";
import { PixDoacao } from "@/components/contribuicao/PixDoacao";
import { ImagemConteudo } from "@/components/shared/ImagemConteudo";
import { DECLARACAO_CONTRIBUIDOR } from "@/lib/salvaguardas";
import { DESTINOS_APOIO } from "@/lib/doacao";
import { IMAGENS } from "@/lib/imagens";

/** ISR — ver CACHE_TTL.static em src/lib/cache.ts */
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Contribuir",
  description: "Apoie a RCT via PIX — alcance, manutenção, expansão e espaço físico.",
};

export default function ContribuirPage() {
  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <ImagemConteudo
          src={IMAGENS.contribuir.src}
          alt={IMAGENS.contribuir.alt}
          credito={IMAGENS.contribuir.credito}
          className="mb-10"
        />
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl text-[var(--sacred-gold)] md:text-5xl">
          Contribuir
        </h1>
        <p className="mt-4 text-[rgba(248,246,240,0.8)]">
          Sua doação via PIX ajuda a levar esta mensagem a mais pessoas e a sustentar a
          plataforma com seriedade.
        </p>

        <ul className="mt-8 space-y-4">
          {DESTINOS_APOIO.map((item) => (
            <li
              key={item}
              className="card-sacred rounded-sm px-6 py-4 text-sm text-[rgba(248,246,240,0.8)]"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-10 card-sacred rounded-sm px-6 py-5 text-sm text-[rgba(248,246,240,0.75)]">
          <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
            Princípio de Ahimsa
          </p>
          <p className="mt-3 italic">&ldquo;{DECLARACAO_CONTRIBUIDOR}&rdquo;</p>
        </div>

        <div className="mt-10">
          <PixDoacao />
        </div>
      </div>
    </div>
  );
}
