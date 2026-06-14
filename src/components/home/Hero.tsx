"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IMAGENS } from "@/lib/imagens";

export function Hero() {
  return (
    <section className="gradient-cosmos relative flex min-h-screen items-center overflow-hidden px-6 pt-24">
      <div className="absolute inset-0 opacity-25">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMAGENS.hero.src}
          alt={IMAGENS.hero.alt}
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="relative mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.3em] text-[var(--sacred-gold)]"
        >
          O Mestre que ensinou, orou e viveu o que pregou — ciência verificável confirma
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-6 font-[family-name:var(--font-cormorant)] text-5xl leading-tight text-[var(--pure-white)] md:text-7xl"
        >
          Jesus — O Mestre
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-8 max-w-2xl text-xl text-[var(--sacred-gold)] md:text-[22px]"
        >
          Ciência, reflexão interior e não-violência como caminho de mudança de verdade.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <Link href="/diagnostico" className="btn-primary">
            Quero conhecer mais
          </Link>
          <Link href="/blog" className="btn-secondary">
            Explorar o Blog
          </Link>
        </motion.div>
        <p className="mt-6 font-[family-name:var(--font-jetbrains)] text-[10px] text-[rgba(248,246,240,0.35)]">
          Foto: {IMAGENS.hero.credito}
        </p>
      </div>
    </section>
  );
}
