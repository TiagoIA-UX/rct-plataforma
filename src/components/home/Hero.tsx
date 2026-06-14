"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IMAGENS } from "@/lib/imagens";
import { MARCA_SLOGAN, MARCA_SLOGAN_COMPLETO, MARCA_NOME } from "@/lib/identidade";

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
          {MARCA_NOME}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-6 font-[family-name:var(--font-cormorant)] text-4xl leading-tight text-[var(--pure-white)] md:text-6xl"
        >
          «{MARCA_SLOGAN}»
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mt-4 font-[family-name:var(--font-cormorant)] text-xl italic text-[rgba(248,246,240,0.75)]"
        >
          {MARCA_SLOGAN_COMPLETO}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-8 max-w-2xl text-lg text-[var(--sacred-gold)] md:text-xl"
        >
          Fé e ciência com comprovação — meditação cristã, atenção plena e amor vivido em ações,
          não só em palavras.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="relative z-10 mt-12 flex flex-wrap gap-4"
        >
          <Link href="/blog" className="btn-primary">
            Explorar o Blog
          </Link>
          <Link href="/contribuir" className="btn-secondary">
            Apoiar o projeto
          </Link>
        </motion.div>
        <p className="mt-6 font-[family-name:var(--font-jetbrains)] text-[10px] text-[rgba(248,246,240,0.35)]">
          Foto: {IMAGENS.hero.credito}
        </p>
      </div>
    </section>
  );
}
