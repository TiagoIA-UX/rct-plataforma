from enum import Enum
from typing import Any

from pydantic import BaseModel, Field


class Pillar(str, Enum):
    FE = "fe"
    CIENCIA = "ciencia"
    TECNOLOGIA = "tecnologia"
    FAMILIA = "familia"
    EDUCACAO = "educacao"
    CRIACAO = "criacao"


class PipelineInput(BaseModel):
    tema: str
    publico_alvo: str
    objetivo: str
    pilar: Pillar = Pillar.FAMILIA


class AgentOutput(BaseModel):
    agent: str
    stage: str
    content: str
    approved: bool = True
    rejection_reason: str | None = None
    metadata: dict[str, Any] = Field(default_factory=dict)


class PipelineState(BaseModel):
    """Estado compartilhado do grafo LangGraph."""

    input: PipelineInput
    institutional_memory: str = ""
    research_dossier: str = ""
    faith_review: str = ""
    science_report: str = ""
    science_confidence: float = 0.0
    written_content: str = ""
    ethics_approved: bool = False
    ethics_notes: str = ""
    multichannel: dict[str, str] = Field(default_factory=dict)
    governance_approved: bool = False
    governance_notes: str = ""
    audit_trail: list[AgentOutput] = Field(default_factory=list)
    blocked: bool = False
    block_reason: str = ""

    model_config = {"arbitrary_types_allowed": True}
