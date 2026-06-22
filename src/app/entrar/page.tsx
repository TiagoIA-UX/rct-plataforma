import Link from "next/link";
import { Suspense } from "react";
import { EntrarComGoogle } from "@/components/auth/EntrarComGoogle";
import { MARCA_NOME } from "@/lib/identidade";
import { EntrarRedirect } from "./EntrarRedirect";

export const metadata = {
  title: "Entrar",
  description: `Acesso à comunidade ${MARCA_NOME} — login verificado com conta Google.`,
};

export default function EntrarPage() {
  return (
    <div className="gradient-cosmos flex min-h-screen items-center justify-center px-6 pt-24 pb-16">
      <div className="card-sacred w-full max-w-md rounded-sm p-10 text-center">
        <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.3em] text-[var(--sacred-gold)]">
          {MARCA_NOME}
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-cormorant)] text-3xl text-[var(--pure-white)]">
          Entrar na comunidade
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[rgba(248,246,240,0.75)]">
          Usamos apenas a verificação da sua conta Google — sem senha separada neste site.
          O e-mail confirmado pelo Google identifica você com segurança.
        </p>

        <Suspense fallback={<p className="mt-8 text-sm text-[rgba(248,246,240,0.5)]">Carregando…</p>}>
          <EntrarRedirect />
        </Suspense>

        <p className="mt-8 text-xs text-[rgba(248,246,240,0.45)]">
          Ao continuar, você concorda com nossos{" "}
          <Link href="/termos" className="text-[var(--sacred-gold)] underline">
            Termos
          </Link>{" "}
          e{" "}
          <Link href="/privacidade" className="text-[var(--sacred-gold)] underline">
            Privacidade
          </Link>
          .
        </p>

        <Link
          href="/"
          className="mt-6 inline-block font-[family-name:var(--font-jetbrains)] text-xs text-[rgba(248,246,240,0.5)] hover:text-[var(--sacred-gold)]"
        >
          ← Voltar ao início
        </Link>
      </div>
    </div>
  );
}
