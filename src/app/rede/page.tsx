"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { ImagemConteudo } from "@/components/shared/ImagemConteudo";
import { IMAGENS } from "@/lib/imagens";
import { MARCA_NOME } from "@/lib/identidade";
import { NodeCard } from "@/components/rede/NodeCard";

export default function RedePage() {
  const { data: session, isPending } = authClient.useSession();
  const usuario = session?.user;

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <p className="text-[rgba(248,246,240,0.6)]">Carregando…</p>
      </div>
    );
  }

  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-4xl">
        <ImagemConteudo
          src={IMAGENS.comunidade.src}
          alt={IMAGENS.comunidade.alt}
          credito={IMAGENS.comunidade.credito}
          className="mb-8"
        />
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl text-[var(--sacred-gold)]">
          Comunidade {MARCA_NOME}
        </h1>
        <p className="mt-4 text-[rgba(248,246,240,0.75)]">
          Olá{usuario?.name ? `, ${usuario.name.split(" ")[0]}` : ""}. Esta área reúne quem entrou
          com conta Google verificada — sem escala de quem vale mais. O blog e o caminho permanecem
          abertos a todos.
        </p>
        {usuario?.email && (
          <p className="mt-2 font-[family-name:var(--font-jetbrains)] text-xs text-[rgba(248,246,240,0.45)]">
            Conectado como {usuario.email}
          </p>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <NodeCard
            nome={usuario?.name?.split(" ")[0] ?? "Você"}
            territorio="ciencia_tecnologia"
          />
          <div className="card-sacred flex items-center justify-center rounded-sm p-6 text-center text-[rgba(248,246,240,0.5)]">
            <p>Novos participantes aparecerão aqui conforme a comunidade crescer.</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/contribuir" className="btn-secondary">
            Apoiar via PIX →
          </Link>
          <Link href="/diagnostico" className="btn-secondary">
            Questionário (opcional)
          </Link>
        </div>
      </div>
    </div>
  );
}
