# Blog Consolidado — RCT Ressonância Científica Tecnológica

> Documento de consolidação: `rct-blog-autonomo` → `rct-plataforma`
> Data: Junho 2026 — Protocolo Mestre Divino v2.0

---

## Módulos Consolidados

| Arquivo | Uso | Conteúdo |
|---|---|---|
| `src/lib/rct-blog.ts` | Client + Server | Categorias, citações, viveka, salvaguardas, imagens, banners, constantes |
| `src/lib/rct-blog.server.ts` | **Server-only** | Tudo acima + geração IA (Groq), DB (Prisma), fila de temas, template HTML |

```ts
// Em Client Components — importar do client-safe:
import { CATEGORIA_LABELS, NIVEIS_ARTIGO } from "@/lib/rct-blog"

// Em Server Components, APIs e lib server-side:
import { listarArtigosPublicados, gerarArtigoDivino } from "@/lib/rct-blog.server"
```

---

## Visão Geral

Este documento descreve a consolidação completa do blog autônomo (`rct-blog-autonomo`) na
plataforma principal da RCT. A integração segue rigorosamente os protocolos da Seção 5 do
Prompt Mestre Divino v2.0, com identidade centrada na **Ressonância Científica Tecnológica**.

---

## Arquitetura do Blog Unificado

### Rotas públicas

| Rota | Descrição |
|---|---|
| `/blog` | Listagem com artigo em destaque, grade e filtro por categoria |
| `/blog/[slug]` | Artigo individual com imagem, social sharing, newsletter CTA |

### Rotas de administração

| Rota | Descrição |
|---|---|
| `/admin` → aba **Artigos** | Lista todos os artigos, gera via IA, acesso ao editor |
| `/admin/artigos/[slug]` | Editor completo: conteúdo, imagem, redes sociais, publicação |

### API Endpoints

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/health` | Health check com verificação de DB |
| `GET` | `/api/cron/generate` | Gerar artigo via IA (Groq/LLaMA) |
| `POST` | `/api/newsletter` | Inscrever na newsletter |
| `DELETE` | `/api/newsletter` | Cancelar inscrição |
| `GET` | `/api/newsletter/unsubscribe` | Descadastramento via link de e-mail |
| `GET/PATCH` | `/api/admin` | Gerenciamento admin (tab=artigos suportado) |

---

## Modelo de Dados — Artigo (Prisma)

Campos adicionados na consolidação:

| Campo | Tipo | Descrição |
|---|---|---|
| `nivel` | `String` | `abertura` \| `aprofundamento` \| `membros` |
| `image_url` | `String?` | URL da imagem de capa |
| `image_credit` | `String?` | Crédito da imagem |
| `social_instagram` | `String?` | Legenda Instagram pronta |
| `social_facebook` | `String?` | Post Facebook pronto |
| `social_linkedin` | `String?` | Post LinkedIn pronto |
| `social_twitter` | `String?` | Tweet pronto (280 chars) |
| `pendente_revisao` | `Boolean` | Aguardando revisão humana (Salvaguarda 0.7) |

### Modelo Newsletter (novo)

```prisma
model Newsletter {
  email     String   @unique
  nome      String?
  ativo     Boolean  @default(true)
  resend_id String?  // sync com Resend Audiences
  ...
}
```

---

## 7 Categorias do Blog (Protocolo Seção 5.1)

| Slug | Nome Público |
|---|---|
| `jesus-grande-yogue` | Jesus: O Grande Yogue |
| `prompts-do-mestre` | Prompts do Grande Mestre |
| `epigenetica-sagrada` | Epigenética Sagrada |
| `virus-do-dna` | Vírus do DNA |
| `misticismo-decodificado` | Misticismo Decodificado |
| `ahimsa-aplicada` | Ahimsa na Prática |
| `linhagem-do-conhecimento` | Linhagem do Conhecimento |

> ⚠️ `prompts-do-mestre` e `epigenetica-sagrada` → **revisão humana obrigatória** (Salvaguarda 0.7).
> Artigos dessas categorias são criados com `publicado: false, pendente_revisao: true`.

---

## Níveis de Acesso por Artigo

| Nível | Descrição |
|---|---|
| `abertura` | Público geral — sem restrição |
| `aprofundamento` | Conteúdo mais denso — ainda público |
| `membros` | Reservado para membros — controle de acesso futuro |

---

## Geração Automática de Artigos (IA)

### Fluxo

1. `GET /api/cron/generate` (autenticado via `CRON_SECRET`)
2. `pickNextBlogTopic()` seleciona tema + categoria da fila rotativa
3. Groq/LLaMA gera JSON com todos os campos do protocolo
4. `prepararArtigo()` aplica salvaguardas (0.1, 0.7) e template Bênção/Maldição
5. Se categoria sensível → `publicado: false` aguarda revisão humana
6. Imagem de capa selecionada automaticamente por `proximaImagemCategoria()`

### Campos gerados pela IA (novos)

- `social_instagram` — legenda com hashtags RCT
- `social_facebook` — post com engajamento
- `social_linkedin` — post profissional ciência/consciência
- `social_twitter` — tweet 280 chars com gancho

---

## Fluxo de Publicação

```
IA gera artigo
     ↓
Categoria sensível? → sim → pendente_revisao=true → Admin analisa → Publicar
                    → não → publicado=true automaticamente
                               ↓
                      Admin pode editar via /admin/artigos/[slug]
                      (imagem, texto, redes sociais)
```

---

## Newsletter

### Configuração (variáveis de ambiente)

```env
RESEND_API_KEY=re_...
RESEND_AUDIENCE_ID=...    # opcional — sincroniza contacts no Resend
RESEND_FROM_EMAIL=noreply@rct.com.br
NEXT_PUBLIC_SITE_URL=https://rct.com.br
```

### Fluxo

1. Usuário preenche formulário no blog (componente `NewsletterBlog`)
2. `POST /api/newsletter` cria registro local + sincroniza Resend (se configurado)
3. E-mail de boas-vindas enviado automaticamente com identidade RCT
4. Descadastramento via link no rodapé do e-mail → `/api/newsletter/unsubscribe?email=...`

---

## Banco de Imagens por Categoria

`src/lib/imagens-artigo.ts` — seleção automática de imagens Unsplash:

- 2 imagens por categoria (uso rotativo)
- Seleção por `proximaImagemCategoria(categoria, indice)`
- Admin pode substituir qualquer imagem no editor
- Open Graph automático com imagem do artigo

---

## Salvaguardas Ativas no Blog

| Salvaguarda | Implementação |
|---|---|
| **0.1** Epigenética / Superioridade | `validarSalvaguardaEpigenetica()` em `blog-agent.ts` |
| **0.3** Ciência × Metáfora | Template obrigatório Bênção/Maldição |
| **0.4** Transparência | Texto visível em `/seguranca` e rodapé newsletter |
| **0.6** Autonomia | `FRASE_AUTONOMIA_PLATAFORMA` no fim de todo artigo |
| **0.7** Revisão Humana | `CATEGORIAS_REVISAO_HUMANA` → `pendente_revisao=true` |

---

## Comandos de Operação

```bash
# Gerar artigo manualmente (local)
node private/scripts/generate-daily-posts.mjs

# Push do schema para o banco (após alterações)
npm run db:push

# Build de produção validado
npm run build

# Verificar typecheck
npm run typecheck
```

---

## Variáveis de Ambiente Necessárias

```env
# Já existentes
DATABASE_URL=postgresql://...
GROQ_API_KEY=...
CRON_SECRET=...
ADMIN_PASSWORD=...
NEXT_PUBLIC_SITE_URL=https://rct.com.br

# Novas (newsletter)
RESEND_API_KEY=...
RESEND_AUDIENCE_ID=...     # opcional
RESEND_FROM_EMAIL=noreply@rct.com.br
```

---

## O que NÃO foi integrado do rct-blog-autonomo

Funcionalidades específicas da terapeuta Elisa Rietjens, sem alinhamento com a missão RCT:

- Agendamento de sessões (Google Calendar)
- Chatbot de leads (estilo consultório)
- Assinatura premium via Mercado Pago (RCT tem seu próprio sistema)
- WhatsApp pessoal da terapeuta
- Instagram API automatizado (publicação manual via textos prontos)

---

> *«A verdade não precisa de ornamentos. Precisa de precisão — e de coragem para se corrigir.»*
>
> Protocolo RCT v2.0 — Ressonância Científica Tecnológica
