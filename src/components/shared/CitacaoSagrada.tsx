"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { citacoes } from "@/lib/citacoes";

export function CitacaoSagrada() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % citacoes.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const atual = citacoes[index];

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
          Jesus e Patanjali — a mesma convergência
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="mt-8"
          >
            <div className="grid gap-6 md:grid-cols-2 md:text-left">
              <blockquote className="card-sacred rounded-sm p-6">
                <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-widest text-[var(--sacred-gold)]">
                  Jesus
                </p>
                <p className="mt-3 font-[family-name:var(--font-cormorant)] text-2xl leading-snug text-[var(--pure-white)] md:text-3xl">
                  &ldquo;{atual.texto}&rdquo;
                </p>
                <p className="mt-3 font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[rgba(248,246,240,0.5)]">
                  {atual.referencia}
                </p>
              </blockquote>
              <blockquote className="card-sacred rounded-sm p-6">
                <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-widest text-[var(--sacred-gold)]">
                  Patanjali
                </p>
                <p className="mt-3 font-[family-name:var(--font-cormorant)] text-2xl leading-snug text-[var(--pure-white)] md:text-3xl">
                  &ldquo;{atual.textoParalelo}&rdquo;
                </p>
                <p className="mt-3 font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[rgba(248,246,240,0.5)]">
                  {atual.referenciaParalela}
                </p>
              </blockquote>
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-[rgba(248,246,240,0.75)]">
              {atual.decodificacao}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
