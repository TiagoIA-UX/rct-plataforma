import { prisma } from "@/lib/prisma";
import { dbConfigurado } from "@/lib/artigos-fallback";
import { statusResendConfig } from "@/lib/newsletter-mail";
import { MARCA_NOME } from "@/lib/identidade";

export async function GET() {
  const checks: Record<string, string> = {
    status: "ok",
    version: process.env.npm_package_version ?? "0.5.2",
    timestamp: new Date().toISOString(),
    plataforma: MARCA_NOME,
  };

  if (dbConfigurado()) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      checks.database = "ok";
      checks.artigos = "database";
    } catch {
      checks.database = "unavailable";
      checks.artigos = "fallback-estatico";
    }
  } else {
    checks.database = "unconfigured";
    checks.artigos = "fallback-estatico";
  }

  const resend = statusResendConfig();
  checks.resend = resend.pronto ? "ok" : "misconfigured";

  return Response.json(
    { ...checks, resend_config: resend },
    { status: 200 }
  );
}
