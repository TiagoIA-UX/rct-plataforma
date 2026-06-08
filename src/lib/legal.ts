/** Dados legais e contatos — preencha via variáveis de ambiente em produção */

import { RCT_NOME_EXIBICAO } from "@/lib/identidade";

export const LEGAL = {
  plataforma: RCT_NOME_EXIBICAO,
  controlador: process.env.NEXT_PUBLIC_CONTROLADOR_NOME ?? "RCT Plataforma",
  emailContato:
    process.env.NEXT_PUBLIC_CONTATO_EMAIL ?? "zairyx.ai@gmail.com",
  emailPrivacidade:
    process.env.NEXT_PUBLIC_DPO_EMAIL ??
    process.env.NEXT_PUBLIC_CONTATO_EMAIL ??
    "zairyx.ai@gmail.com",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "https://rct-plataforma.vercel.app",
  ultimaAtualizacao: "2026-06-07",
} as const;
