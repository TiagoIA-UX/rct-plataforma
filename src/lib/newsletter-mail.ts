/**
 * Camada de e-mail — newsletter (Resend)
 * Boas-vindas na inscrição + aviso de novo artigo na publicação.
 */

import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { labelCategoria } from "@/lib/categorias";
import { MARCA_NOME, MARCA_SLOGAN_COMPLETO } from "@/lib/identidade";

export type ResultadoEmail = {
  ok: boolean;
  id?: string;
  erro?: string;
};

export type ResultadoNotificacao = {
  enviados: number;
  falhas: number;
  ignorado?: string;
  erros: string[];
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function siteUrlBase(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://todos-sejam-um.vercel.app"
  ).replace(/\/$/, "");
}

/** Rejeita URLs Vercel e endereços malformados no FROM */
export function validarFromEmail(from?: string): { valido: boolean; motivo?: string } {
  const v = from?.trim();
  if (!v) return { valido: false, motivo: "RESEND_FROM_EMAIL não configurado" };
  if (!EMAIL_RE.test(v)) return { valido: false, motivo: "RESEND_FROM_EMAIL não é um e-mail válido" };
  if (/vercel\.app|localhost/i.test(v)) {
    return {
      valido: false,
      motivo: "RESEND_FROM_EMAIL não pode ser domínio Vercel — use domínio verificado no Resend",
    };
  }
  return { valido: true };
}

export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

export function statusResendConfig(): {
  api_key: boolean;
  from_email: boolean;
  from_motivo?: string;
  audience_id: boolean;
  modo: "producao" | "sandbox";
  aviso_sandbox?: string;
  pronto: boolean;
} {
  const from = process.env.RESEND_FROM_EMAIL?.trim() ?? "";
  const fromCheck = validarFromEmail(from);
  const api_key = Boolean(process.env.RESEND_API_KEY?.trim());
  const sandbox = /onboarding@resend\.dev/i.test(from);
  return {
    api_key,
    from_email: fromCheck.valido,
    from_motivo: fromCheck.motivo,
    audience_id: Boolean(process.env.RESEND_AUDIENCE_ID?.trim()),
    modo: sandbox ? "sandbox" : "producao",
    aviso_sandbox: sandbox
      ? "Modo teste Resend: e-mails só chegam ao endereço da conta Resend. Verifique um domínio em resend.com/domains para enviar a todos os inscritos."
      : undefined,
    pronto: api_key && fromCheck.valido,
  };
}

function layoutEmail(conteudo: string): string {
  return `
<div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0d1520; color: #F8F6F0;">
  ${conteudo}
  <hr style="border: none; border-top: 1px solid rgba(200,169,81,0.2); margin: 32px 0;" />
  <p style="color: rgba(248,246,240,0.35); font-size: 11px; text-align: center;">
    ${MARCA_NOME} — ${MARCA_SLOGAN_COMPLETO}
  </p>
</div>`.trim();
}

export function htmlBoasVindas(nome: string | undefined, email: string): string {
  const saudacao = nome ? `${nome}, obrigado` : "Obrigado";
  const unsub = `${siteUrlBase()}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
  return layoutEmail(`
  <h1 style="color: #C9A84C; font-size: 22px; font-weight: 600;">Bem-vindo a ${MARCA_NOME}</h1>
  <p style="color: rgba(248,246,240,0.85); line-height: 1.8;">
    ${saudacao} por se inscrever. Você receberá avisos quando publicarmos novos artigos —
    fé, ciência e honestidade sobre o que ajuda e o que pode prejudicar.
  </p>
  <p style="color: rgba(248,246,240,0.55); font-size: 14px; font-style: italic;">${MARCA_SLOGAN_COMPLETO}</p>
  <p style="margin-top: 24px;">
    <a href="${siteUrlBase()}/blog" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #c9a84c, #e8c97a); color: #0d1520; text-decoration: none; font-weight: 600; border-radius: 2px;">
      Explorar o blog
    </a>
  </p>
  <p style="color: rgba(248,246,240,0.4); font-size: 12px; margin-top: 28px;">
    <a href="${unsub}" style="color: #C9A84C;">Cancelar inscrição</a> a qualquer momento.
  </p>`);
}

export function htmlNovoArtigo(artigo: {
  titulo: string;
  slug: string;
  subtitulo?: string | null;
  categoria: string;
  meta_descricao?: string | null;
}): string {
  const url = `${siteUrlBase()}/blog/${artigo.slug}`;
  const cat = labelCategoria(artigo.categoria);
  const resumo = artigo.meta_descricao || artigo.subtitulo || "";
  return layoutEmail(`
  <h1 style="color: #C9A84C; font-size: 22px;">Novo artigo em ${MARCA_NOME}</h1>
  <p style="color: rgba(248,246,240,0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">${cat}</p>
  <h2 style="color: #F8F6F0; font-size: 20px; margin-top: 8px;">${artigo.titulo}</h2>
  ${resumo ? `<p style="color: rgba(248,246,240,0.75); line-height: 1.7;">${resumo}</p>` : ""}
  <p style="margin-top: 24px;">
    <a href="${url}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #c9a84c, #e8c97a); color: #0d1520; text-decoration: none; font-weight: 600; border-radius: 2px;">
      Ler artigo
    </a>
  </p>`);
}

export async function enviarEmail(
  para: string,
  assunto: string,
  html: string
): Promise<ResultadoEmail> {
  const resend = getResend();
  const fromCheck = validarFromEmail(process.env.RESEND_FROM_EMAIL);
  if (!resend) return { ok: false, erro: "RESEND_API_KEY ausente" };
  if (!fromCheck.valido) return { ok: false, erro: fromCheck.motivo };

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!.trim(),
      to: para,
      subject: assunto,
      html,
    });
    if (error) {
      console.error("[newsletter-mail] Resend error:", error);
      const msg = error.message ?? "Erro ao enviar e-mail";
      if (/only send testing emails|verify a domain/i.test(msg)) {
        return {
          ok: false,
          erro:
            "Domínio de envio não verificado no Resend — inscrição salva, mas o e-mail só será entregue após configurar RESEND_FROM_EMAIL com domínio verificado (resend.com/domains).",
        };
      }
      return { ok: false, erro: msg };
    }
    return { ok: true, id: data?.id };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[newsletter-mail] Falha ao enviar:", msg);
    return { ok: false, erro: msg };
  }
}

export async function enviarBoasVindas(
  email: string,
  nome?: string | null
): Promise<ResultadoEmail> {
  return enviarEmail(
    email,
    `Bem-vindo a ${MARCA_NOME}`,
    htmlBoasVindas(nome ?? undefined, email)
  );
}

export async function sincronizarResendAudience(
  email: string,
  nome?: string | null
): Promise<void> {
  const resend = getResend();
  const audienceId = process.env.RESEND_AUDIENCE_ID?.trim();
  if (!resend || !audienceId) return;

  try {
    const { data } = await resend.contacts.create({
      email,
      firstName: nome ?? undefined,
      audienceId,
      unsubscribed: false,
    });
    if (data?.id) {
      await prisma.newsletter.updateMany({
        where: { email },
        data: { resend_id: data.id },
      });
    }
  } catch (err) {
    console.warn("[newsletter-mail] Resend audience sync falhou:", err);
  }
}

/** Notifica todos os inscritos ativos sobre um artigo recém-publicado */
export async function notificarInscritosNovoArtigo(artigo: {
  id: string;
  titulo: string;
  slug: string;
  subtitulo?: string | null;
  categoria: string;
  meta_descricao?: string | null;
  publicado: boolean;
}): Promise<ResultadoNotificacao> {
  if (!artigo.publicado) {
    return { enviados: 0, falhas: 0, ignorado: "artigo não publicado", erros: [] };
  }

  const cfg = statusResendConfig();
  if (!cfg.pronto) {
    return {
      enviados: 0,
      falhas: 0,
      ignorado: cfg.from_motivo ?? "Resend não configurado",
      erros: [],
    };
  }

  const inscritos = await prisma.newsletter.findMany({
    where: { ativo: true, consentimento: true },
    select: { email: true },
  });

  if (!inscritos.length) {
    return { enviados: 0, falhas: 0, ignorado: "nenhum inscrito ativo", erros: [] };
  }

  const assunto = `Novo artigo: ${artigo.titulo}`;
  const html = htmlNovoArtigo(artigo);
  let enviados = 0;
  let falhas = 0;
  const erros: string[] = [];

  for (const { email } of inscritos) {
    const r = await enviarEmail(email, assunto, html);
    if (r.ok) enviados++;
    else {
      falhas++;
      if (r.erro) erros.push(`${email}: ${r.erro}`);
    }
    // Resend free tier: evitar burst
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  console.log(
    `[newsletter-mail] Novo artigo "${artigo.slug}": ${enviados} enviados, ${falhas} falhas`
  );
  return { enviados, falhas, erros };
}
