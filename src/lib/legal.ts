/** Dados legais e contatos — preencha via variáveis de ambiente em produção */

export const LEGAL = {
  plataforma: "RCT — Religião Científica Tecnológica",
  controlador: process.env.NEXT_PUBLIC_CONTROLADOR_NOME ?? "RCT Plataforma",
  emailContato:
    process.env.NEXT_PUBLIC_CONTATO_EMAIL ?? "contato@rct.com.br",
  emailPrivacidade:
    process.env.NEXT_PUBLIC_DPO_EMAIL ??
    process.env.NEXT_PUBLIC_CONTATO_EMAIL ??
    "privacidade@rct.com.br",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "https://rct-plataforma.vercel.app",
  ultimaAtualizacao: "2026-06-07",
} as const;
