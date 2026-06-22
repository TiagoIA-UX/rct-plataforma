"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IMAGENS } from "@/lib/imagens";
import {
  MARCA_CTA_PRINCIPAL,
  MARCA_FRASE_ESPERANCA,
  MARCA_FRASE_GUIA_LINHAS,
  MARCA_HERO_SUB_LINHA1,
  MARCA_HERO_SUB_LINHA2,
  MARCA_NOME,
} from "@/lib/identidade";

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.3em] text-[var(--sacred-gold)]"
        >
          {MARCA_NOME}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className={`${heroCopy} mt-8 text-3xl leading-snug text-[var(--pure-white)] md:text-5xl md:leading-tight`}
        >
          {MARCA_FRASE_ESPERANCA}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.45 }}
          className={`${heroCopy} mt-8 space-y-4 text-lg text-[rgba(248,246,240,0.85)] md:text-xl`}
        >
          <p>{MARCA_HERO_SUB_LINHA1}</p>
          <p>{MARCA_HERO_SUB_LINHA2}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.55 }}
          className={`${heroCopy} mt-10 space-y-1 text-base italic text-[var(--sacred-gold)] md:text-lg`}
        >
          {MARCA_FRASE_GUIA_LINHAS.map((linha) => (
            <p key={linha}>{linha}</p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <Link href="/blog" className="btn-primary capitalize">
            {MARCA_CTA_PRINCIPAL}
          </Link>
          <Link href="/caminho" className="btn-secondary capitalize">
            O Caminho
          </Link>
        </motion.div>

        <p className="mt-10 font-[family-name:var(--font-jetbrains)] text-[10px] text-[rgba(248,246,240,0.35)]">
          {IMAGENS.hero.alt} — {IMAGENS.hero.credito}
        </p>
      </div>
    </section>
  );
}
