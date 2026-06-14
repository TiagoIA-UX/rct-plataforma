import { prisma } from "@/lib/prisma";

export async function GET() {
  const checks: Record<string, string> = {
    status: "ok",
    version: process.env.npm_package_version ?? "0.3.0",
    timestamp: new Date().toISOString(),
    plataforma: "RCT — Ressonância Científica Tecnológica",
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = "ok";
  } catch {
    checks.database = "unavailable";
  }

  const todasOk = !Object.values(checks).includes("unavailable");

  return Response.json(checks, { status: todasOk ? 200 : 503 });
}
