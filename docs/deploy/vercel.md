# Deploy na Vercel — Todos Sejam Um (repositório `rct-plataforma`)

## Conta e projeto corretos (obrigatório)

| Item | Valor correto |
|------|----------------|
| Conta | **Tiago Aureliano da Rocha** (`tiago-a-rocha`) |
| Team Vercel | **Team Zairyx** (`team-zairyx`) |
| Team ID | `team_7VXPFnWh4B2aHS581UwK77vz` |
| Projeto | `rct-plataforma` |
| URL de produção | `https://todos-sejam-um.vercel.app` |
| Repositório | `TiagoIA-UX/rct-plataforma` |

**Não usar** outras contas ou teams Vercel para este projeto. O CLI local deve apontar para **Team Zairyx**, não para contas de terceiros.

```bash
vercel logout
vercel login
# Entrar como Tiago Aureliano da Rocha
Remove-Item -Recurse -Force .vercel   # se existir vínculo errado
vercel link --scope team-zairyx --project rct-plataforma
```

## Variáveis de ambiente (checklist)

Em **Team Zairyx → rct-plataforma → Settings → Environment Variables → Production**, configure (copie os valores do seu `.env.local`):

| Variável | Obrigatória | Função |
|----------|-------------|--------|
| `DATABASE_URL` | Sim | Blog, newsletter, admin (Neon `rct-plataforma`) |
| `NEXT_PUBLIC_SITE_URL` | Sim | `https://todos-sejam-um.vercel.app` |
| `NEXT_PUBLIC_APP_URL` | Sim | igual ao SITE_URL |
| `ADMIN_PASSWORD` | Sim | Admin + notify newsletter |
| `CRON_SECRET` | Sim | Cron jobs |
| `GROQ_API_KEY` | Sim | Geração de artigos |
| `RESEND_API_KEY` | Recomendado | Newsletter |
| `RESEND_FROM_EMAIL` | Recomendado | Domínio verificado no Resend |
| `NEON_AUTH_BASE_URL` | Sim (comunidade) | URL Auth do Neon — login Google |
| `NEON_AUTH_COOKIE_SECRET` | Sim (comunidade) | Segredo ≥ 32 caracteres (gerar aleatório) |
| `NEXT_PUBLIC_CONTATO_EMAIL` | Recomendado | Rodapé |

**Diagnóstico:** após salvar e redeploy, abra `/api/health`:
- `"database":"ok"` → banco conectado
- `"artigos":"fallback-estatico"` → blog funciona via JSON (sem banco)
- `"database":"unconfigured"` → falta `DATABASE_URL`

## 1. Repositório

Confirme que o código está no GitHub e que a branch `main` contém o projeto Next.js na raiz.

## 2. Importar na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new) **na conta do fundador**.
2. Importe o repositório `TiagoIA-UX/rct-plataforma`.
3. **Framework Preset:** Next.js
4. **Root Directory:** `./` (raiz)

## 3. Variáveis de ambiente

Configure em **Project → Settings → Environment Variables** (produção). Mínimo:

| Variável | Tipo | Notas |
|----------|------|--------|
| `DATABASE_URL` | Secret | Neon projeto **`rct-plataforma`** — sem isso o blog fica vazio |
| `GROQ_API_KEY` | Secret | |
| `ADMIN_PASSWORD` | Secret | |
| `CRON_SECRET` | Secret | |
| `NEXT_PUBLIC_SITE_URL` | Public | `https://todos-sejam-um.vercel.app` |
| `NEXT_PUBLIC_APP_URL` | Public | igual ao `SITE_URL` |
| `NEXT_PUBLIC_CONTATO_EMAIL` | Public | |
| `RESEND_API_KEY` | Secret | Newsletter |
| `RESEND_FROM_EMAIL` | Secret | Domínio verificado no Resend |

Lista completa: `docs/CREDENCIAIS_AMBIENTE.md`.

**Diagnóstico após deploy:** `GET https://todos-sejam-um.vercel.app/api/health` deve retornar `"database":"ok"`.

## 4. Banco de dados

Após configurar `DATABASE_URL` na Vercel, execute localmente (com a mesma URL do Neon):

```bash
npx prisma db push
npm run migrate:categorias
npm run seed:posts-do-dia
```

Depois, redeploy ou aguarde o ISR (até 1h) ou chame `GET /api/cron/revalidate-blog` com `Authorization: Bearer ${CRON_SECRET}`.

## 5. Cron — Geração de artigos

Configure um Vercel Cron Job apontando para:

```
GET /api/cron/generate
Authorization: Bearer ${CRON_SECRET}
```

## 6. Telegram Webhook

Após deploy com URL de produção:

```bash
curl -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook" \
  -d "url=${NEXT_PUBLIC_SITE_URL}/api/telegram/webhook"
```

## 7. Domínio customizado

**Project → Settings → Domains** → adicione o domínio próprio e atualize `NEXT_PUBLIC_SITE_URL`.
