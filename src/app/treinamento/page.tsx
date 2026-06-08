import { redirect } from "next/navigation";

/** Rota legada — conteúdo reservado em /formacao */
export default function TreinamentoRedirect() {
  redirect("/formacao");
}
