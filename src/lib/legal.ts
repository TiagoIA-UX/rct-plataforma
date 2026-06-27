/** Dados legais e contatos — preencha via variáveis de ambiente em produção */

import { MARCA_NOME } from "@/lib/identidade";

export const LEGAL = {
  plataforma: MARCA_NOME,
  controlador: process.env.NEXT_PUBLIC_CONTROLADOR_NOME ?? MARCA_NOME,
  emailContato:
    process.env.NEXT_PUBLIC_CONTATO_EMAIL ?? "zairyx.ai@gmail.com",
  emailPrivacidade:
    process.env.NEXT_PUBLIC_DPO_EMAIL ??
    process.env.NEXT_PUBLIC_CONTATO_EMAIL ??
    "zairyx.ai@gmail.com",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "https://institutoneuma-tiagorocha-team-zairyx.vercel.app",
  ultimaAtualizacao: "2026-06-07",
} as const;
