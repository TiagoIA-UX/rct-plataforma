# RCT — Religião Científica Tecnológica

> O fim do misticismo irracional. O início da evolução biológica consciente.

Organismo digital de ressonância — plataforma + rede + protocolo de reconhecimento.
Convergência entre espiritualidade pura, ciência verificável e tecnologia.

> **O que é a RCT?** Consulte [`docs/ESSENCIA.md`](docs/ESSENCIA.md).

**Versão:** `0.1.1` · **Motor:** parcialmente recalibrado (ver Essência)

## Stack

- Next.js 16 + React 19 + TypeScript
- Prisma + Neon PostgreSQL
- Groq (LLaMA 3.3) — conteúdo e análise de ressonância
- Telegram Bot API — convites para escolhidos
- Resend, Upstash Redis, Vercel Analytics (configuráveis)
- Zod + Framer Motion

## Início rápido

```bash
cp .env.example .env.local
npm install
npx prisma db push
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Rotas principais

| Rota | Descrição |
|------|-----------|
| `/` | Homepage RCT |
| `/manifesto` | Manifesto cinematográfico |
| `/diagnostico` | Wizard de ressonância (4 passos) |
| `/contribuir` | Área de contribuições científicas |
| `/rede` | Área de membros |
| `/admin` | Painel administrativo |

## Credenciais

Consulte `docs/CREDENCIAIS_AMBIENTE.md` para configurar todas as variáveis de ambiente.

## Pilares

1. **Ciência Verificável** — cada ensinamento tem mecanismo biológico
2. **Ahimsa Principiológica** — não-violência como identidade
3. **Missão Territorial** — cada membro é um nó com território

## Licença

Propriedade intelectual de Tiago Aureliano da Rocha.
