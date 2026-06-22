# Changelog

Todas as mudanças notáveis seguem [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/)
e [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [0.7.0] - 2026-06-22

### Acervo editorial NEUMA — modo ENRIQUECER

#### Adicionado
- Pipeline editorial sem Groq: `enriquecer-artigo-neuma.mjs`, `auditoria-profundidade-neuma.mjs`, `biblioteca-neuma.mjs`.
- Métrica **Profundidade Humana (0–10)** e tipos editoriais (Sofrimento · Transformação · Florescimento).
- Agente Crítico e score ampliado (`agente-critico-neuma.txt`, `agente-score-neuma.txt`).
- Detecção de protocolo legado (`artigo-legado.ts`); filtro na home e listagens.

#### Alterado
- **6 artigos publicados** reestruturados nas 6 seções NEUMA preservando densidade original (modo ENRIQUECER).
- Títulos canônicos: Paulo, Jesus aos 12; duplicatas legado despublicadas.
- Removido texto de transparência de ressonância (Footer, questionário, `identidade.ts`).

#### Corrigido
- Encoding UTF-8 no snapshot editorial; originals via `git show v0.6.0`.

## [0.6.0] - 2026-06-22

### Instituto NEUMA — rebrand e Módulo Mateus

#### Adicionado
- **Sistema de Decodificação Humana — Módulo Mateus:** 28 capítulos × 3 tipos (`principal`, `sofrimento`, `florescimento`) com fila editorial (`mateus-fila.ts`) e pipeline dedicado (`mateus-pipeline.ts`).
- Prompts: `agente-00-brief-mateus`, `agente-03-redator-mateus`, `estrutura-artigo-canonico` (6 seções), `sistema-decodificacao-humana`, `prompt-mestre-neuma`.
- Categorias `mateus-transformacao` e `evangelhos-transformacao`; página `/blog/mateus-transformacao` e redirect de rotas `biblia-neuro*`.
- npm `generate:mateus` (`scripts/generate-mateus-modulo.mjs`); `gerarArtigoDivino()` prioriza a fila Mateus.

#### Alterado
- Identidade pública **Instituto NEUMA** — hero, footer, logo, SEO, Open Graph e copy editorial (`identidade.ts`, componentes home/layout).
- **Princípio da Esperança Responsável** no hero: texto centralizado, iniciais maiúsculas (`capitalize`) e frase-guia em três linhas.
- Salvaguardas e prompts alinhados ao PROMPT MESTRE (investigação de transformação humana, não apologética).
- Renomeação de categorias legadas (`milagres-decodificados`, `jesus-transformacao`, etc.) e páginas do blog.

## [0.4.2] - 2026-06-14

### Salvaguarda 0.8 — Protocolo de Aceitação Geral (Eixo Neuroteologia)
- Formalizado em código: `PRINCIPIO_NEUROTEOLOGIA` e `descreveJesusComoYogue()` em `src/lib/salvaguardas.ts`; bloqueio na publicação (`validarArtigoAntesPublicar`) quando Jesus é descrito como yogue/Samadhi.
- Documentado em `docs/PROTOCOLO_NEUROTEOLOGIA.md` e na regra sempre-aplicada `.cursor/rules/protocolo-mestre.mdc`.
- Eixo: Caminho do aperfeiçoamento pela meditação/atenção com comprovação científica, referenciado biblicamente, na tradição contemplativa cristã — base para a "bíblia neuroteológica" da plataforma.

## [0.4.1] - 2026-06-14

### Eixo Neuroteologia reforçado (alinhamento editorial)
- Protocolo dos agentes (`agente-03-redator-paulo.txt`, `estrutura-artigo-paulo.txt`) passa a explicitar o Caminho do aperfeiçoamento pela **meditação e atenção plena com comprovação científica**, ancorado na tradição contemplativa cristã (oração contemplativa, lectio divina, oração do coração, respiração unida à oração).
- Decisão baseada na aceitação do público-alvo cristão/católico (Carta da CDF, 1989; *Jesus Cristo Portador da Água da Viva*, 2003): meditação a serviço da oração tem alta aceitação; yoga como caminho primário, não. Mantida a Salvaguarda 0.5 — yoga/tradições orientais apenas como comparação rotulada; nunca Jesus descrito como yogue/Samadhi.

## [0.4.0] - 2026-06-14

### Pipeline multi-agente de geração de artigos (padrão Paulo)

#### Adicionado
- Protocolo multi-agente em `src/lib/prompts/agents/`: Scout de polêmicas (01), Exegese de versículos (02), Redator padrão Paulo (03), Orquestrador (Patanjali + ética planetária + Salvaguardas RCT) e checklist `estrutura-artigo-paulo.txt`.
- Orquestração em `src/lib/blog-pipeline.ts`, integrada ao `blog-agent.ts`.
- CLI `scripts/generate-artigo-pipeline.mjs` + npm `generate:pipeline` (`--tema`, `--dry-run`, `--publish`).
- Imagem de capa definida pela **palavra-chave do título** (`src/lib/imagens-palavra-chave.ts`, `imagens-artigo.ts`, `banner-artigo.ts`) + script `sync:imagens`.
- Newsletter do blog, health check (`/api/health`) e admin de artigos (`/admin/artigos`).
- **Fluxo de aprovação humana no Telegram** (`@posts_do_dia_bot`): o cron das 03h gera rascunho e envia mensagem com botões Aprovar/Rejeitar; nada é publicado sem confirmação. Módulo `src/lib/telegram-posts-bot.ts`, rota `/api/telegram/posts-webhook` (com `secret_token`) e script `posts-bot:setup`.
- Conversor markdown→HTML padrão RCT (`scripts/seed-posts-do-dia.mjs`, npm `seed:posts-do-dia`) + fontes versionadas em `content/posts-do-dia/`.
- Estilos de tabela, listas, links, blockquote e citação paralela no `prose-rct`.

#### Alterado
- Auditoria de linguagem clara em todo o site (Viveka → "5 perguntas de honestidade"/"Pergunta para refletir"; Ahimsa → não-violência; "neurociência comportamental" → "ciência do comportamento"; "Aceitar medição" → "Aceitar cookies/estatísticas").
- `revisar-artigos-existentes.mjs` e pipeline com backoff/retry para limite de TPM do Groq e resumo do artigo no orquestrador.
- Artigos no padrão Paulo (versículos concretos → ciência [ESTABELECIDA/HIPÓTESE] → "o que NÃO sustenta" → prática/meditação com comprovação + bloco bênção/maldição): Paulo, Jesus aos 12 anos, 10 Mandamentos, Fé e Razão, Tentação e Autocontrole (Hebreus 4:15).

#### Removido
- Fallback de geração legada e textos placeholder em `blog-agent.ts`: artigos incompletos são descartados (sem publicação de conteúdo provisório).

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

[0.6.0]: https://github.com/TiagoIA-UX/rct-plataforma/releases/tag/v0.6.0
[0.4.2]: https://github.com/TiagoIA-UX/rct-plataforma/releases/tag/v0.4.2
[0.4.1]: https://github.com/TiagoIA-UX/rct-plataforma/releases/tag/v0.4.1
[0.4.0]: https://github.com/TiagoIA-UX/rct-plataforma/releases/tag/v0.4.0
[0.3.0]: https://github.com/TiagoIA-UX/rct-plataforma/releases/tag/v0.3.0
[0.2.0]: https://github.com/TiagoIA-UX/rct-plataforma/releases/tag/v0.2.0
[0.1.1]: https://github.com/TiagoIA-UX/blog-terapia-elisa-rietjens/releases/tag/v0.1.1
[0.1.0]: https://github.com/TiagoIA-UX/blog-terapia-elisa-rietjens/releases/tag/v0.1.0
