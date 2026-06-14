# Deploy na Vercel — Todos Sejam Um (repositório `rct-plataforma`)

## Conta e projeto corretos (obrigatório)

| Item | Valor correto |
|------|----------------|
| Conta Vercel | **Tiago Aureliano da Rocha** (`TiagoIA-UX` no GitHub) |
| Projeto | `rct-plataforma` |
| URL de produção | `https://todos-sejam-um.vercel.app` |
| Repositório | `TiagoIA-UX/rct-plataforma` |

**Não usar** outras contas ou teams da Vercel para este projeto (ex.: contas de terceiros, `uni-ia-br`, ou qualquer organização que não seja a do fundador). Deploy ou `vercel link` na conta errada não atualiza o site público e pode expor variáveis no projeto errado.

Se o CLI local estiver logado na conta errada:

```bash
vercel logout
vercel login
# Entrar com a conta Tiago Aureliano da Rocha
rm -rf .vercel   # Windows: Remove-Item -Recurse -Force .vercel
vercel link --project rct-plataforma
```

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
