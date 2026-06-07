# Contribuindo — RCT Plataforma

## Princípio

Toda contribuição deve respeitar os pilares inegociáveis da RCT:

- **Ahimsa** como critério de pertencimento
- **Ciência verificável** como linguagem
- **Transparência total** dos mecanismos
- **Descentralização horizontal** (sem hierarquia de poder)

## Área de Contribuições (`/contribuir`)

Membros e visitantes podem submeter:

- Reforços com base científica
- Correções de imprecisões técnicas
- Aperfeiçoamentos doutrinários
- Propostas de novos módulos de treinamento

Toda submissão passa por análise no painel admin antes de ser incorporada.

## Ambiente local

```bash
cp .env.example .env.local
# Preencha DATABASE_URL e GROQ_API_KEY no mínimo

npm install
npx prisma db push
npm run dev
```

## Branches

- `main` — estável
- `feature/*` — novas funcionalidades

## Commits

Mensagens em português ou inglês, no imperativo: `feat:`, `fix:`, `docs:`, `chore:`.

## Código

- TypeScript estrito
- Validação Zod em formulários e APIs
- Consentimento LGPD explícito antes de coleta de dados
- Sem manipulação encoberta ou urgência artificial
