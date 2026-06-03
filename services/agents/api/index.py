"""API leve na Vercel — health check. Pipeline completo: CLI local ou servidor dedicado."""

from fastapi import FastAPI

app = FastAPI(
    title="Evangelho Digital — Agents",
    version="0.1.0",
    description="Serviço de agentes (Groq + LangGraph). Endpoint de saúde para deploy.",
)


@app.get("/")
def root() -> dict[str, str]:
    return {
        "service": "evangelho-agents",
        "status": "online",
        "note": "Pipeline completo via CLI (services/agents) ou servidor com mais tempo de execução.",
    }


@app.get("/health")
def health() -> dict[str, bool | str]:
    return {"ok": True, "service": "evangelho-agents"}
