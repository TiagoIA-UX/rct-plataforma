function parsePositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

const scoreMinimoEscolhido = parsePositiveInt(
  process.env.DIAGNOSTICO_SCORE_MINIMO_ESCOLHIDO,
  80
);

export const env = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",
  cronSecret: process.env.CRON_SECRET || "",
  adminPassword: process.env.ADMIN_PASSWORD || "",
  timezone: process.env.GOOGLE_CALENDAR_TIMEZONE || "America/Sao_Paulo",
  scoreMinimoEscolhido,
  enableTelegramConvites: process.env.ENABLE_TELEGRAM_CONVITES === "true",
  enableAdminAlerts: process.env.ENABLE_ADMIN_ALERTS === "true",
  rctPlataformaUrl: process.env.RCT_PLATAFORMA_URL || "https://rct.com.br",
};

export function requireEnv(name: string, value?: string) {
  if (!value?.trim()) {
    throw new Error(`Variável obrigatória não configurada: ${name}`);
  }
  return value;
}

export function isCronAuthorized(authorizationHeader: string | null) {
  if (!env.cronSecret) return false;
  return authorizationHeader === `Bearer ${env.cronSecret}`;
}

export function hasGoogleCalendarEnv() {
  return Boolean(process.env.GOOGLE_CALENDAR_EMAIL?.trim())
    && Boolean(process.env.GOOGLE_CALENDAR_PRIVATE_KEY?.trim());
}

export function hasMercadoPagoEnv() {
  return Boolean(
    process.env.MERCADOPAGO_ACCESS_TOKEN || process.env.MERCADO_PAGO_ACCESS_TOKEN
  );
}

export function hasCoreProductionEnv() {
  return {
    required: {
      DATABASE_URL: Boolean(process.env.DATABASE_URL),
      NEXT_PUBLIC_SITE_URL: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
      ADMIN_PASSWORD: Boolean(process.env.ADMIN_PASSWORD),
    },
    integrations: {
      CRON_SECRET: Boolean(process.env.CRON_SECRET),
      GROQ_API_KEY: Boolean(process.env.GROQ_API_KEY),
      TELEGRAM: Boolean(process.env.TELEGRAM_BOT_TOKEN),
      MERCADOPAGO:
        hasMercadoPagoEnv() && Boolean(process.env.MERCADOPAGO_WEBHOOK_SECRET),
      NEON_AUTH:
        Boolean(process.env.NEON_AUTH_BASE_URL) &&
        Boolean(process.env.NEON_AUTH_COOKIE_SECRET),
      GOOGLE_CALENDAR: hasGoogleCalendarEnv(),
      RESEND: Boolean(process.env.RESEND_API_KEY),
      UPSTASH: Boolean(process.env.UPSTASH_REDIS_REST_URL),
    },
  };
}
