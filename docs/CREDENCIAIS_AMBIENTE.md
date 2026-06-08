# Credenciais de Ambiente — RCT Plataforma

Documento centralizado para adaptação das credenciais da plataforma RCT — Ressonância Científica Tecnológica.

## Origem das credenciais

As variáveis foram **preservadas do Evangelho Digital** (`apps/web/.env.example` + `services/agents/.env.example`) e adaptadas para a stack RCT (Prisma + Neon). O arquivo `.env.local` na raiz concentra os valores reais para desenvolvimento local.

**Importante:** o projeto Neon `blog-terapia` **não** é usado pela RCT. O banco da RCT é o projeto Neon **`rct-plataforma`** (isolado).

## Como usar

1. O `.env.local` já deve existir na raiz (gerado a partir do legado Evangelho Digital).
2. Se precisar recriar: copie `.env.example` → `.env.local` e preencha conforme abaixo.
3. **Nunca** commite `.env.local`, `private/` (scripts, lib, prompts) ou arquivos com secrets reais.

---

## Banco de Dados — Neon PostgreSQL

| Variável | Onde obter | Obrigatória |
|----------|-----------|-------------|
| `DATABASE_URL` | [Neon Console](https://console.neon.tech) → Connection string | Sim |

Após configurar:

```bash
npx prisma db push
npx prisma generate
```

---

## Groq — IA de Conteúdo e Análise

| Variável | Onde obter | Obrigatória |
|----------|-----------|-------------|
| `GROQ_API_KEY` | [console.groq.com](https://console.groq.com) → API Keys | Sim (para blog e análise de missão) |

Modelo padrão: `llama-3.3-70b-versatile`

---

## Telegram Bot — Pescador de Gênios

| Variável | Onde obter | Obrigatória |
|----------|-----------|-------------|
| `TELEGRAM_BOT_TOKEN` | BotFather → `/newbot` → @rct_plataforma_bot | Para convites |
| `TELEGRAM_ADMIN_CHAT_ID` | @userinfobot no Telegram | Para alertas admin |
| `ENABLE_TELEGRAM_CONVITES` | `true` ou `false` | Não |
| `ENABLE_ADMIN_ALERTS` | `true` ou `false` | Não |

Registrar webhook após deploy:

```bash
curl -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook" \
  -d "url=${NEXT_PUBLIC_SITE_URL}/api/telegram/webhook"
```

---

## Upstash Redis — Cache e Filas

| Variável | Onde obter | Obrigatória |
|----------|-----------|-------------|
| `UPSTASH_REDIS_REST_URL` | [upstash.com](https://upstash.com) → Redis → REST URL | Não (futuro) |
| `UPSTASH_REDIS_REST_TOKEN` | Mesmo painel → REST Token | Não (futuro) |

---

## Resend — Emails Transacionais

| Variável | Onde obter | Obrigatória |
|----------|-----------|-------------|
| `RESEND_API_KEY` | [resend.com](https://resend.com) → API Keys | Não (futuro) |

---

## Admin e Cron

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `ADMIN_PASSWORD` | Senha do painel `/admin` | Sim (produção) |
| `CRON_SECRET` | Bearer token para `/api/cron/generate` | Para cron |

---

## App e Identidade

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_SITE_URL` | URL de produção (ex: `https://rct.com.br`) |
| `NEXT_PUBLIC_APP_URL` | Alias da URL (mesmo valor) |
| `NEXT_PUBLIC_CONTATO_EMAIL` | E-mail exibido no rodapé (`zairyx.ai@gmail.com`) |
| `NEXT_PUBLIC_PIX_CHAVE` | Chave PIX — CNPJ (`61699939000180`) |
| `NEXT_PUBLIC_PAYPAL_EMAIL` | E-mail PayPal (`tiagorocha1777@gmail.com`) |
| `NEXT_PUBLIC_MEI_RAZAO_SOCIAL` | Razão social no rodapé |
| `NEXT_PUBLIC_MEI_CNPJ` | CNPJ formatado no rodapé (`61.699.939/0001-80`) |

---

## Integrações Futuras (preservar para expansão)

| Variável | Serviço |
|----------|---------|
| `MERCADOPAGO_ACCESS_TOKEN` | Assinatura premium |
| `MERCADOPAGO_WEBHOOK_SECRET` | Webhook Mercado Pago |
| `GOOGLE_CALENDAR_CLIENT_ID` | Agendamento |
| `GOOGLE_CALENDAR_CLIENT_SECRET` | Agendamento |
| `NEON_AUTH_URL` | Neon Auth (Google Login) |
| `NEON_AUTH_SECRET` | Neon Auth |

---

## RCT Config

| Variável | Default | Descrição |
|----------|---------|-----------|
| `RCT_PLATAFORMA_URL` | `https://rct.com.br` | URL canônica |
| `DIAGNOSTICO_SCORE_MINIMO_ESCOLHIDO` | `80` | Score mínimo para nível escolhido |

---

## Vercel — Variáveis de Produção

Configure em **Project → Settings → Environment Variables**:

- Todas as variáveis acima marcadas como obrigatórias
- `NEXT_PUBLIC_*` → podem ser expostas ao browser
- Demais → marcar como **Sensitive**

Consulte também `docs/deploy/vercel.md` para instruções de deploy.
