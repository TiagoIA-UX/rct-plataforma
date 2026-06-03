import type { Metadata } from "next";
import { CentroPage } from "@/components/centros/centro-page";

export const metadata: Metadata = {
  title: "Centro Fé e Ciência",
  description: "Diálogo entre neurociência, psicologia, educação e espiritualidade.",
};

const TOPICOS = [
  { titulo: "Neurociência", descricao: "Como o cérebro aprende, decide e forma hábitos — com base em evidências." },
  { titulo: "Psicologia", descricao: "Comportamento humano, emoções e bem-estar integrado à fé." },
  { titulo: "Educação", descricao: "Metodologias que reduzem carga cognitiva e favorecem retenção." },
  { titulo: "Espiritualidade", descricao: "Vida de oração, liturgia e sabedoria cristã aplicada ao cotidiano." },
] as const;

export default function FeCienciaPage() {
  return (
    <CentroPage
      titulo="Centro Fé e Ciência"
      descricao="Integrar razão e fé sem pseudociência nem reducionismo."
      topicos={TOPICOS}
    />
  );
}
