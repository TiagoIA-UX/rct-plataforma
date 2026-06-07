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
      <div className="mx-auto max-w-4xl text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <blockquote className="font-[family-name:var(--font-cormorant)] text-3xl leading-snug text-[var(--pure-white)] md:text-4xl">
              &ldquo;{atual.texto}&rdquo;
            </blockquote>
            <p className="mt-4 font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
              {atual.referencia}
            </p>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-[rgba(248,246,240,0.75)]">
              {atual.decodificacao}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
