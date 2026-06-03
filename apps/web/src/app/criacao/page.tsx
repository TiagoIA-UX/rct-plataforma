import type { Metadata } from "next";
import { CentroPage } from "@/components/centros/centro-page";

export const metadata: Metadata = {
  title: "Centro da Criação",
  description: "Sustentabilidade, proteção animal e responsabilidade ecológica.",
};

const TOPICOS = [
  { titulo: "Proteção animal", descricao: "Compaixão e stewardship sobre todas as criaturas." },
  { titulo: "Sustentabilidade", descricao: "Consumo consciente e estilo de vida regenerativo." },
  { titulo: "Conservação ambiental", descricao: "Preservar biomas e recursos para as gerações futuras." },
  { titulo: "Responsabilidade ecológica", descricao: "Ações práticas no lar, na comunidade e na sociedade." },
] as const;

export default function CriacaoPage() {
  return (
    <CentroPage
      titulo="Centro da Criação"
      descricao="Cuidar da casa comum como expressão de fé e responsabilidade."
      topicos={TOPICOS}
    />
  );
}
