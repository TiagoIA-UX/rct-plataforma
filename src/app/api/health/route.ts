import { prisma } from "@/lib/prisma";
import { dbConfigurado } from "@/lib/artigos-fallback";
import { hasCoreProductionEnv } from "@/lib/config/env";
import { statusResendConfig } from "@/lib/newsletter-mail";
import { MARCA_NOME } from "@/lib/identidade";

export async function GET() {
  const envCheck = hasCoreProductionEnv();
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

  const faltando = Object.entries(envCheck.required)
    .filter(([, ok]) => !ok)
    .map(([k]) => k);

  return Response.json({
    ...checks,
    resend_config: resend,
    env: envCheck,
    env_faltando_producao: faltando.length ? faltando : undefined,
    dica:
      faltando.length > 0
        ? "Variáveis existem no painel mas não chegam ao deploy? Confira: Environment = Production, depois Redeploy."
        : undefined,
  });
}
