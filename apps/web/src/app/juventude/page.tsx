import type { Metadata } from "next";
import { CentroPage } from "@/components/centros/centro-page";

export const metadata: Metadata = {
  title: "Centro da Juventude",
  description: "Propósito, carreira, saúde emocional e tecnologia consciente.",
};

const TOPICOS = [
  { titulo: "Propósito", descricao: "Descobrir vocação e servir com os dons recebidos." },
  { titulo: "Carreira", descricao: "Ética profissional, trabalho digno e responsabilidade social." },
  { titulo: "Saúde emocional", descricao: "Autoconhecimento, resiliência e busca de ajuda quando necessário." },
  { titulo: "IA e tecnologia", descricao: "Uso crítico e criativo da inteligência artificial." },
] as const;

export default function JuventudePage() {
  return (
    <CentroPage
      titulo="Centro da Juventude"
      descricao="Acompanhar jovens na construção de identidade, carreira e responsabilidade cidadã."
      topicos={TOPICOS}
    />
  );
}
