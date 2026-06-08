import { redirect } from "next/navigation";

/** Rota legada — conteúdo movido para /caminho */
export default function ManifestoRedirect() {
  redirect("/caminho");
}
