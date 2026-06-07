import type { Metadata } from "next";
import { DiagnosticoWizard } from "@/components/diagnostico/DiagnosticoWizard";

export const metadata: Metadata = {
  title: "Diagnóstico de Ressonância",
  description: "Calibragem de frequência — o pescador de gênios empáticos da RCT.",
};

export default function DiagnosticoPage() {
  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl text-[var(--pure-white)] md:text-5xl">
          Diagnóstico de Ressonância
        </h1>
        <p className="mt-4 text-[rgba(248,246,240,0.75)]">
          Quatro passos. Sem invasão. Com consentimento explícito.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-3xl">
        <DiagnosticoWizard />
      </div>
    </div>
  );
}
