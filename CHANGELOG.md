# Changelog

Todas as mudanças notáveis seguem [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/)
e [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [0.3.0] - 2026-06-08

### Blog cron recalibrado + seed do Artigo 01
- Inserção do Artigo 01 no blog via `scripts/seed-artigo01.mjs` (com categoria `mandamentos`).
- Agendamento automático para 03:00 (horário de São Paulo) e pulando o sábado (dia sagrado).
- Motor de geração: prompts/agent passam a rodar pelo caminho de `src/lib/` (reduz dependência de `private/` em deploy).
- Ajuste de UI do blog para exibir a categoria de mandamentos.

## [0.2.0] - 2026-06-07

### Evangelização pública + treinamento privado

- Critério Ahimsa/carne **removido do diagnóstico público** — triagem interna via IA (admin only)
- Fases de treinamento: Divya Manas → Fase I/II/III com prova anti-mentira + aprovação admin
- Agente Divino Autônomo (`blog-agent.ts`) — neurônios = agentes, Prompt Divino = neuroplasticidade
- Série inaugural: 8 milagres de Jesus decodificados (prioridade no cron)
- `/blog`, `/treinamento`, `scripts/generate-daily-posts.mjs`
- Repositório: `https://github.com/TiagoIA-UX/rct-plataforma`

## [0.1.1] - 2026-06-07

### Transplante de Motor — blog-terapia → RCT

Adaptação in-place do repositório `blog-terapia-elisa-rietjens` (fork impossível na mesma conta GitHub).

### Adicionado

- `docs/ESSENCIA.md` — ontologia da RCT (plataforma + rede + protocolo)
- Motor herdado: Neon Auth (`@neondatabase/auth`), Mercado Pago RCT, `env.ts` centralizado
- `vercel.json` com cron de geração de artigos
- Scripts `check-node-version.mjs`, `check-prod-env.mjs`
- Model Prisma `Membro` para assinatura premium
- API `/api/auth/[...path]`, `/api/webhook/mercadopago`
- Arquivo `VERSION`, scripts `release:patch|minor|major`
- `.nvmrc` (Node 22)
- Upgrade Next.js 15 → 16 (requisito Neon Auth)

### Alterado

- `package.json` → v0.1.1, repositório aponta para `blog-terapia-elisa-rietjens`
- `.env.example` unificado com variáveis de produção do motor legado

## [0.1.0] - 2026-06-07

### Gênesis — Motor Recalibrado

Primeira release da RCT após transformação completa do repositório legado.

### Adicionado

- Plataforma Next.js 15 + React 19 + TypeScript na raiz
- Identidade visual RCT (cosmos escuro, dourado sagrado, tipografia Cormorant/Source Serif)
- Homepage com Hero, Três Pilares, citações rotativas, blog grid, diagnóstico rápido
- Manifesto cinematográfico (`/manifesto`)
- Sistema de Diagnóstico de Ressonância — wizard 4 passos (`/diagnostico`)
- Algoritmo de score com critério eliminatório Ahimsa (`ressonancia-score.ts`)
- Análise IA de missão via Groq (`groq-analise.ts`)
- API `/api/diagnostico` com persistência Prisma + Neon
- Área de Contribuições (`/contribuir`) com votos e moderação
- Área da Rede (`/rede`) com gate por nível de ressonância
- Painel Admin (`/admin`) — diagnósticos, escolhidos, contribuições, métricas
- Telegram Bot — convites e webhook (`telegram-bot.ts`)
- Cron de geração de artigos (`/api/cron/generate`)
- Schema Prisma: `Diagnostico`, `Contribuicao`, `VotoContribuicao`, `Artigo`
- Prompt divino de blog (`prompts/rct_blog_prompt.txt`)
- Documentação de credenciais (`docs/CREDENCIAIS_AMBIENTE.md`)
- Proteção de materiais confidenciais (`private/treinamento/`)

### Removido

- Monorepo Evangelho Digital (apps/web, services/agents, supabase)
- Branding e rotas legadas (centros, governança inline)

### Pendente (próximas MINOR)

- Neon Auth / Google Login
- Mercado Pago (assinatura premium)
- Google Calendar (agendamento)
- Resend (emails transacionais)
- Upstash Redis (cache de scores)
- Módulos de treinamento Fase I–III integrados à UI

[0.1.1]: https://github.com/TiagoIA-UX/blog-terapia-elisa-rietjens/releases/tag/v0.1.1
[0.1.0]: https://github.com/TiagoIA-UX/blog-terapia-elisa-rietjens/releases/tag/v0.1.0
