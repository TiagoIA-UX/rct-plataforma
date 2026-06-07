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
    nivel === "alto" ? "/blog?categoria=milagres-decodificados" : nivel === "medio" ? "/manifesto" : "/";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="card-sacred mx-auto max-w-2xl rounded-sm p-10 text-center"
    >
      <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
        Score de Ressonância: {score}/100
      </p>
      <h2 className="mt-4 font-[family-name:var(--font-cormorant)] text-3xl text-[var(--pure-white)]">
        {resposta.titulo}
      </h2>
      <p className="mt-6 italic text-[var(--sacred-gold)]">&ldquo;{fraseReconhecimento}&rdquo;</p>
      <p className="mt-6 whitespace-pre-line text-[rgba(248,246,240,0.8)]">{resposta.paragrafo}</p>
      <Link href={ctaHref} className="btn-primary mt-10 inline-flex">
        {resposta.cta}
      </Link>
    </motion.div>
  );
}
