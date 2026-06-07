import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

const PLANOS_PREMIUM: Record<string, { titulo: string; preco: number }> = {
  rede_mensal: { titulo: "RCT Rede — Acesso Mensal", preco: 47 },
  rede_anual: { titulo: "RCT Rede — Acesso Anual", preco: 397 },
};

function getAccessToken() {
  return process.env.MERCADOPAGO_ACCESS_TOKEN || process.env.MERCADO_PAGO_ACCESS_TOKEN;
}

function getClient() {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error("Token do Mercado Pago não configurado.");
  }
  return new MercadoPagoConfig({ accessToken });
}

export async function criarPreferenciaPremium(input: {
  plano: string;
  nome: string;
  email: string;
  diagnosticoId?: string;
}) {
  const client = getClient();
  const preference = new Preference(client);
  const plano = PLANOS_PREMIUM[input.plano] ?? PLANOS_PREMIUM.rede_mensal;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const externalReference = `rct-premium-${Date.now()}`;

  const result = await preference.create({
    body: {
      items: [
        {
          id: input.plano,
          title: plano.titulo,
          quantity: 1,
          unit_price: plano.preco,
          currency_id: "BRL",
        },
      ],
      payer: { name: input.nome, email: input.email },
      external_reference: externalReference,
      metadata: {
        plano: input.plano,
        nome: input.nome,
        email: input.email,
        diagnosticoId: input.diagnosticoId || "",
        origem: "rct-plataforma",
      },
      notification_url: `${siteUrl}/api/webhook/mercadopago`,
      back_urls: {
        success: `${siteUrl}/rede?status=success`,
        pending: `${siteUrl}/rede?status=pending`,
        failure: `${siteUrl}/rede?status=failure`,
      },
      auto_return: "approved",
    },
  });

  return {
    id: result.id,
    initPoint: result.init_point,
    sandboxInitPoint: result.sandbox_init_point,
    externalReference,
  };
}

export async function getPaymentById(paymentId: string) {
  const client = getClient();
  const payment = new Payment(client);
  return payment.get({ id: paymentId });
}
