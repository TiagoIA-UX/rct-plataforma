"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth/client";

export function MenuConta() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <span className="font-[family-name:var(--font-jetbrains)] text-xs text-[rgba(248,246,240,0.45)]">
        …
      </span>
    );
  }

  if (!session?.user) {
    return (
      <Link href="/entrar" className="btn-secondary text-sm px-4 py-2">
        Entrar
      </Link>
    );
  }

  const nome = session.user.name?.split(" ")[0] ?? "Conta";

  return (
    <div className="flex items-center gap-3">
      <span className="hidden font-[family-name:var(--font-jetbrains)] text-xs text-[rgba(248,246,240,0.65)] sm:inline">
        {nome}
      </span>
      <button
        type="button"
        className="btn-secondary text-sm px-4 py-2"
        onClick={() => authClient.signOut({ fetchOptions: { onSuccess: () => window.location.assign("/") } })}
      >
        Sair
      </button>
    </div>
  );
}
