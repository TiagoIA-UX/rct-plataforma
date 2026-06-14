import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { MARCA_NOME } from "@/lib/identidade";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return new Response("Email não encontrado.", { status: 400 });
  }

  await prisma.newsletter.updateMany({
    where: { email },
    data: { ativo: false },
  }).catch(() => null);

  return new Response(
    `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/><title>Descadastrado</title></head>
<body style="font-family:Georgia,serif;background:#0d1520;color:#F8F6F0;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0">
  <div style="max-width:480px;text-align:center;padding:32px">
    <h1 style="color:#C9A84C;">Descadastramento concluído</h1>
    <p style="color:rgba(248,246,240,0.75);">Você não receberá mais e-mails de ${MARCA_NOME}. Caso queira retornar, visite nosso site.</p>
    <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "/"}" style="color:#C9A84C;text-decoration:none;">← Voltar à plataforma</a>
  </div>
</body></html>`,
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
