"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { NivelPublico } from "@/types/diagnostico";

interface Props {
  nivel: NivelPublico;
  score: number;
  fraseReconhecimento: string;
  resposta: {
    titulo: string;
    paragrafo: string;
    cta: string;
    acao: string;
  };
}

export function ResultadoRessonancia({ nivel, score, fraseReconhecimento, resposta }: Props) {
  const ctaHref =
    nivel === "alto" ? "/blog?categoria=milagres-decodificados" : nivel === "medio" ? "/caminho" : "/";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="card-sacred mx-auto max-w-2xl rounded-sm p-10 text-center"
    >
      <h2 className="font-[family-name:var(--font-cormorant)] text-3xl text-[var(--pure-white)]">
        {resposta.titulo}
      </h2>
      <p className="mt-6 italic text-[var(--sacred-gold)]">&ldquo;{fraseReconhecimento}&rdquo;</p>
      <p className="mt-6 whitespace-pre-line text-[rgba(248,246,240,0.8)]">{resposta.paragrafo}</p>
      <p className="mt-6 font-[family-name:var(--font-jetbrains)] text-[10px] text-[rgba(248,246,240,0.35)]">
        Índice interno de coerência (não é nota nem julgamento): {score}/100
      </p>
      <Link href={ctaHref} className="btn-primary mt-10 inline-flex">
        {resposta.cta}
      </Link>
    </motion.div>
  );
}
