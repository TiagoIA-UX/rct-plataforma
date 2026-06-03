import type { Metadata } from "next";
import { CentroPage } from "@/components/centros/centro-page";

export const metadata: Metadata = {
  title: "Centro da Família",
  description: "Educação dos filhos, relacionamentos e comunicação em casa.",
};

const TOPICOS = [
  { titulo: "Educação dos filhos", descricao: "Formação moral, intelectual e espiritual com amor e limites saudáveis." },
  { titulo: "Relacionamentos", descricao: "Diálogo, perdão e presença afetiva no núcleo familiar." },
  { titulo: "Comunicação", descricao: "Escuta ativa e linguagem que edifica, não que divide." },
  { titulo: "Tecnologia em casa", descricao: "Uso consciente de telas e proteção digital para crianças e adolescentes." },
] as const;

export default function FamiliaPage() {
  return (
    <CentroPage
      titulo="Centro da Família"
      descricao="Fortalecer o lar como espaço de formação, acolhimento e transmissão de valores."
      topicos={TOPICOS}
    />
  );
}
