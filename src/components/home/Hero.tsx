"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="gradient-cosmos flex min-h-screen items-center px-6 pt-24">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.3em] text-[var(--sacred-gold)]"
        >
          Religião Científica Tecnológica
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-6 font-[family-name:var(--font-cormorant)] text-5xl leading-tight text-[var(--pure-white)] md:text-7xl"
        >
          A Verdade que a Ciência
          <br />
          finalmente consegue nomear.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-8 max-w-2xl text-xl text-[var(--sacred-gold)] md:text-[22px]"
        >
          Epigenética. Neurociência. Ahimsa.
          <br />
          O código-fonte que Jesus viveu e Patanjali codificou.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <Link href="/diagnostico" className="btn-primary">
            Iniciar Calibragem
          </Link>
          <Link href="/manifesto" className="btn-secondary">
            Acessar o Manifesto
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
