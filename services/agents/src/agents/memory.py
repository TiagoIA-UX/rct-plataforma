"""Carrega memória institucional para injeção em todos os agentes."""

from pathlib import Path

from agents.config import settings


def load_institutional_memory() -> str:
    """Concatena documentos da base de conhecimento permanente."""
    memory_dir = settings.memory_dir
    if not memory_dir.exists():
        return (
            "[AVISO] Memória institucional não encontrada. "
            "Operar apenas com princípios embutidos no sistema."
        )

    parts: list[str] = []
    for path in sorted(memory_dir.glob("*.md")):
        parts.append(f"## Arquivo: {path.name}\n\n{path.read_text(encoding='utf-8')}")

    return "\n\n---\n\n".join(parts)


INSTITUTIONAL_CONTEXT = load_institutional_memory()
