import { prisma } from "@/lib/prisma";
import { statusResendConfig } from "@/lib/newsletter-mail";
import { MARCA_NOME } from "@/lib/identidade";

export async function GET() {
  const checks: Record<string, string> = {
    status: "ok",
    version: process.env.npm_package_version ?? "0.5.1",
    timestamp: new Date().toISOString(),
    plataforma: MARCA_NOME,
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = "ok";
  } catch {
    checks.database = "unavailable";
  }

  const resend = statusResendConfig();
  checks.resend = resend.pronto ? "ok" : "misconfigured";

  const todasOk = checks.database === "ok";

  return Response.json(
    { ...checks, resend_config: resend },
    { status: todasOk ? 200 : 503 }
  );
}
