import type { Metadata } from "next";
import { DiagnosticoWizard } from "@/components/diagnostico/DiagnosticoWizard";
import { ImagemConteudo } from "@/components/shared/ImagemConteudo";
import { IMAGENS } from "@/lib/imagens";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Questionário",
  description: "Autoconhecimento opcional — respeitoso, com consentimento LGPD.",
};

export default function DiagnosticoPage() {
  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl text-center">
        <ImagemConteudo
          src={IMAGENS.questionario.src}
          alt={IMAGENS.questionario.alt}
          credito={IMAGENS.questionario.credito}
          className="mb-10"
        />
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl text-[var(--pure-white)] md:text-5xl">
          Questionário de Autoconhecimento
        </h1>
        <p className="mt-4 text-[rgba(248,246,240,0.75)]">
          Três passos curtos. Sem julgamento. Você controla o que compartilha.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-3xl">
        <DiagnosticoWizard />
      </div>
    </div>
  );
}
