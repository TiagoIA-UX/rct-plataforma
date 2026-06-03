# Evangelho Digital

Plataforma de formação humana integral que une fé, ciência, tecnologia, família, educação e cuidado com a criação.

## Princípio orientador

> Esta funcionalidade ajuda o usuário a se tornar uma pessoa melhor, mais consciente, mais responsável e mais capaz de contribuir positivamente para sua família, comunidade e sociedade?

## Estrutura do monorepo

```
Evangelho_Digital/
├── apps/web/              # Next.js — interface principal
├── services/agents/       # Python — orquestrador multiagente (Groq + LangGraph)
├── supabase/migrations/   # PostgreSQL + pgvector
├── docs/
│   ├── institutional-memory/  # Base de conhecimento dos agentes
│   └── governance/            # Políticas e código de ética
└── docker-compose.yml
```

## Módulos da plataforma

| Centro | Rota | Foco |
|--------|------|------|
| Centro da Família | `/familia` | Educação, relacionamentos, comunicação |
| Centro da Juventude | `/juventude` | Propósito, carreira, saúde emocional |
| Centro Fé e Ciência | `/fe-ciencia` | Neurociência, psicologia, espiritualidade |
| Centro da Criação | `/criacao` | Sustentabilidade, conservação |
| Centro de Aprendizagem | `/aprendizagem` | Trilhas, cursos, certificados |

## Stack

- **Frontend:** Next.js 15, React, TypeScript, TailwindCSS, ShadCN
- **Backend:** Supabase (Auth, PostgreSQL, Edge Functions)
- **IA:** Groq API, LangGraph, pgvector
- **Observabilidade:** OpenTelemetry, Grafana, Prometheus
- **Analytics:** Plausible (privacy-first)

## Início rápido

### Pré-requisitos

- Node.js 20+
- Python 3.11+
- Docker e Docker Compose
- Conta Supabase e chave Groq API

### Variáveis de ambiente

Copie os exemplos e preencha:

```bash
cp apps/web/.env.example apps/web/.env.local
cp services/agents/.env.example services/agents/.env
```

### Desenvolvimento local (recomendado)

**Windows (PowerShell):**

```powershell
.\scripts\setup.ps1          # primeira vez — instala dependências
.\scripts\start-local.ps1    # sobe Docker, instala deps e inicia http://localhost:3000
```

Atalho: dê duplo clique em `start.bat` na raiz do projeto.

**Linux / macOS / Git Bash:**

```bash
chmod +x scripts/start-local.sh
./scripts/start-local.sh
```

Opções do script:

| Flag | Efeito |
|------|--------|
| `-SkipDocker` / `--skip-docker` | Não sobe Redis/Postgres |
| `-OnlyInfra` / `--only-infra` | Só Docker, sem Next.js |
| `-SkipInstall` / `--skip-install` | Pula `npm install` |

### Desenvolvimento manual

```bash
docker compose up -d
cd apps/web && npm install && npm run dev
cd services/agents && pip install -e ".[dev]" && python -m agents.cli run --dry-run
```

### Pipeline de conteúdo (agentes)

```
Pesquisa → Fé → Ciência → Redação → Ética → Multicanal → Governança → Publicação
```

Nenhum estágio pode ser ignorado. Nenhum conteúdo é publicado por um único modelo.

## Governança

Documentos em `docs/governance/`:

- Código de Ética
- Política de Privacidade (LGPD)
- Política de IA Responsável
- Termos de Uso

## Licença

Projeto de impacto social. Consulte `LICENSE` para termos de uso do código.
