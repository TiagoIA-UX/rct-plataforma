# Orquestrador Multiagente (Groq + LangGraph)

Pipeline obrigatório — **nenhum estágio pode ser ignorado**:

```
Pesquisa → Fé → Ciência → Redação → Ética → Multicanal → Governança → Publicação
```

## Agentes

| # | Agente | Função |
|---|--------|--------|
| 1 | Pesquisador | Dossiê, referências, evidências |
| 2 | Especialista em Fé | Parecer doutrinário, liturgia |
| 3 | Especialista Científico | Validação, anti-pseudociência |
| 4 | Redator Neurocomportamental | Clareza, carga cognitiva |
| 5 | Auditor Ético | Bloqueio de manipulação |
| 6 | Gerador Multicanal | Artigo, redes, newsletter… |
| 7 | Governança | Metadados, taxonomia, auditoria |

## Uso

```bash
pip install -e ".[dev]"
cp .env.example .env
# Editar GROQ_API_KEY

python -m agents.cli run \
  --tema "Gratidão na família" \
  --publico "pais com filhos 6-12 anos" \
  --objetivo "Prática diária de reconhecimento mútuo" \
  --pilar familia
```

## Memória institucional

Todos os agentes recebem o contexto de `docs/institutional-memory/` antes de gerar material.

## Observabilidade

OpenTelemetry configurável via `OTEL_EXPORTER_OTLP_ENDPOINT`.
