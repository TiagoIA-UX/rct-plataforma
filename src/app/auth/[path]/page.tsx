import { redirect } from "next/navigation";

/** Rotas legadas do Better Auth — login exclusivo via Google em /entrar */
export default async function AuthLegacyPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  if (path === "sign-out") {
    redirect("/entrar");
  }

  redirect("/entrar");
}
