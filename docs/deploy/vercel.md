# Deploy na Vercel — Evangelho Digital

Monorepo com dois serviços no mesmo projeto (Vercel **Services**):

| Serviço | Pasta | URL em produção |
|---------|--------|-----------------|
| **web** (Next.js) | `apps/web` | `https://seu-dominio.vercel.app/` |
| **agents** (FastAPI) | `services/agents/api` | `https://seu-dominio.vercel.app/_/agents/health` |

O arquivo `vercel.json` na raiz já define isso. No painel da Vercel, o **Framework Preset** deve ser **Services** (não só “Next.js”).

---

## 1. Repositório no GitHub

Confirme que o código está em:

`https://github.com/TiagoIA-UX/evangelho-digital`

**O botão Deploy só fica ativo depois que `vercel.json` existir na branch `main` do GitHub.** Se o arquivo só está no PC, a Vercel mostra: *"vercel.json required to deploy projects with multiple services"*.

Faça commit e push (mínimo: `vercel.json`, `services/agents/api/`, `.vercelignore`):

```powershell
cd C:\Users\omago\OneDrive\Desktop\Evangelho_Digital
git add vercel.json .vercelignore services/agents/api/ docs/deploy/
git commit -m "chore: adiciona vercel.json para deploy Services na Vercel"
git push origin main
```

Depois, na tela de importação, clique em **Refresh** ou reabra o link de importação.

---

## 2. Importar na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new).
2. **Import Git Repository** → `TiagoIA-UX/evangelho-digital`.
3. **Project Name:** `evangelho-digital` (ou o nome que preferir).
4. **Root Directory:** deixe **`./`** (raiz do repositório).
5. A Vercel deve detectar **Services** por causa do `vercel.json`.
6. **Não** defina “Root Directory” como `apps/web` — isso ignora o monorepo.

---

## 3. Variáveis de ambiente (Production)

Em **Project → Settings → Environment Variables**, adicione para **Production** (e opcionalmente Preview):

### Públicas (podem ir no browser)

| Nome | Valor |
|------|--------|
| `NEXT_PUBLIC_APP_URL` | `https://evangelho-digital.vercel.app` (ou seu domínio customizado) |
| `NEXT_PUBLIC_MEI_RAZAO_SOCIAL` | Tiago Aureliano da Rocha |
| `NEXT_PUBLIC_MEI_CNPJ` | 61.699.939/0001-80 |
| `NEXT_PUBLIC_CONTATO_EMAIL` | tiagorocha1777@gmail.com |
| `NEXT_PUBLIC_PIX_TELEFONE` | 12996887993 |
| `NEXT_PUBLIC_PIX_TELEFONE_FORMATADO` | (12) 99688-7993 |
| `NEXT_PUBLIC_PAYPAL_EMAIL` | tiagorocha1777@gmail.com |
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto (Supabase → Settings → API) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_...` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | mesmo valor da publishable |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | (opcional) domínio do Plausible |
| `LITURGIA_API_URL` | `https://liturgia.up.railway.app/v2` |
| `NEXT_DISABLE_DEVTOOLS` | `1` |

### Secretas (só servidor — marque “Sensitive”)

| Nome | Valor |
|------|--------|
| `SUPABASE_SECRET_KEY` | `sb_secret_...` |
| `SUPABASE_SERVICE_ROLE_KEY` | mesmo valor da secret |
| `GROQ_API_KEY` | chave Groq (para uso futuro em rotas server-side) |

Copie os valores do seu `apps/web/.env.local` e `services/agents/.env` — **nunca** commite esses arquivos.

---

## 4. Deploy

Clique em **Deploy**. O primeiro build pode levar alguns minutos.

Após o deploy:

- Site: `https://<projeto>.vercel.app`
- Saúde dos agentes: `https://<projeto>.vercel.app/_/agents/health`

---

## 5. Domínio customizado (opcional)

**Project → Settings → Domains** → adicione seu domínio e atualize:

`NEXT_PUBLIC_APP_URL=https://www.seudominio.org`

---

## 6. Pipeline de agentes (Groq)

O pipeline com 7 agentes é **pesado** para serverless (tempo e tamanho). Na Vercel há apenas o endpoint **/health**.

Para rodar o pipeline completo:

- **Local:** `cd services/agents` → `pip install -e .` → `python -m agents.cli run --dry-run`
- **Produção (recomendado depois):** Railway, Render, Fly.io ou VM com o `Dockerfile` em `services/agents/`.

---

## 7. CLI local (opcional)

```powershell
npm i -g vercel
cd C:\Users\omago\OneDrive\Desktop\Evangelho_Digital
vercel login
vercel link
vercel env pull apps/web/.env.local
vercel dev -L
```

---

## Problemas comuns

| Sintoma | Solução |
|---------|---------|
| Build usa pasta errada | Root Directory = `./` e preset **Services** |
| Página sem Supabase | Preencher `NEXT_PUBLIC_SUPABASE_URL` na Vercel |
| Rodapé com URL localhost | Ajustar `NEXT_PUBLIC_APP_URL` para a URL de produção |
| Erro de lockfile em `C:\Users\omago\` | Manter `outputFileTracingRoot` em `apps/web/next.config.ts` (já configurado) |

---

## Supabase

Rode as migrações no SQL Editor do Supabase:

`supabase/migrations/001_initial_schema.sql`
