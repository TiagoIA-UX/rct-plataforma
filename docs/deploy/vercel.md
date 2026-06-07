# Deploy na Vercel — RCT Plataforma

## 1. Repositório

Confirme que o código está no GitHub e que a branch `main` contém o projeto Next.js na raiz.

## 2. Importar na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new).
2. Importe o repositório RCT.
3. **Framework Preset:** Next.js
4. **Root Directory:** `./` (raiz)

## 3. Variáveis de ambiente

Configure conforme `docs/CREDENCIAIS_AMBIENTE.md`. Mínimo para produção:

| Variável | Tipo |
|----------|------|
| `DATABASE_URL` | Secret |
| `GROQ_API_KEY` | Secret |
| `ADMIN_PASSWORD` | Secret |
| `NEXT_PUBLIC_SITE_URL` | Public |
| `NEXT_PUBLIC_APP_URL` | Public |
| `NEXT_PUBLIC_CONTATO_EMAIL` | Public |

## 4. Banco de dados

Após o primeiro deploy, execute localmente com a `DATABASE_URL` de produção:

```bash
npx prisma db push
```

Ou configure um script de migração no CI.

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

**Project → Settings → Domains** → adicione `rct.com.br` e atualize `NEXT_PUBLIC_SITE_URL`.
