import { redirect } from "next/navigation";

/** Redireciona slug legado para a categoria canônica */
export default function BibliaNeurocientificaRedirect() {
  redirect("/blog/mateus-transformacao");
}
