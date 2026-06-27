"use client";

import { motion } from "framer-motion";
import { IMAGENS } from "@/lib/imagens";
import { MARCA_HERO_ACOLHIMENTO } from "@/lib/identidade";

const heroCopy =
  "w-full text-center capitalize font-[family-name:var(--font-cormorant)]";

export function Hero() {
  return (
    <section className="gradient-cosmos relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24">
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

      <div className="relative z-10 w-full max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className={`${heroCopy} text-lg text-[var(--sacred-gold)] md:text-xl`}
        >
          {MARCA_HERO_ACOLHIMENTO}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className={`${heroCopy} mt-8 text-3xl leading-snug text-[var(--pure-white)] md:text-5xl md:leading-tight`}
        >
          &ldquo;As Provações Purificam Nosso Ser Fazendo-nos Brilhar pela Sabedoria.&rdquo;
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-4 font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[rgba(248,246,240,0.6)]"
        >
          Tiago Rocha · inspirado em{" "}
          <cite className="not-italic text-[var(--sacred-gold)]">1 Pedro 1:7</cite>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mx-auto mt-2 max-w-2xl font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-widest text-[rgba(248,246,240,0.4)]"
        >
          Paralelo científico ·{" "}
          <span className="text-[var(--sacred-gold)]">Crescimento Pós-Traumático</span> —{" "}
          <cite className="not-italic">Tedeschi &amp; Calhoun, 2004</cite>
        </motion.p>

        <p className="mt-12 font-[family-name:var(--font-jetbrains)] text-[10px]">
          <span className="text-[var(--sacred-gold)]">{IMAGENS.hero.alt}</span>
          <span className="text-[rgba(248,246,240,0.35)]"> — {IMAGENS.hero.credito}</span>
        </p>
      </div>
    </section>
  );
}
