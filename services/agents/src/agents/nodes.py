"""Nós do grafo — um por agente do pipeline."""

import re

from agents import prompts
from agents.llm import invoke_agent
from agents.memory import INSTITUTIONAL_CONTEXT
from agents.schemas import AgentOutput, PipelineState


def _ctx(state: dict) -> PipelineState:
    return PipelineState.model_validate(state)


def _to_dict(state: PipelineState) -> dict:
    return state.model_dump()


def _user_block(state: PipelineState, extra: str) -> str:
    inp = state.input
    return f"""
MEMÓRIA INSTITUCIONAL:
{state.institutional_memory or INSTITUTIONAL_CONTEXT}

ENTRADA DO PIPELINE:
- Tema: {inp.tema}
- Público-alvo: {inp.publico_alvo}
- Objetivo: {inp.objetivo}
- Pilar: {inp.pilar.value}

{extra}
""".strip()


def init_memory(state: dict) -> dict:
    s = _ctx(state)
    s.institutional_memory = INSTITUTIONAL_CONTEXT
    return _to_dict(s)


def researcher(state: dict) -> dict:
    s = _ctx(state)
    if s.blocked:
        return _to_dict(s)
    out = invoke_agent(prompts.RESEARCHER, _user_block(s, "Produza o dossiê de pesquisa."))
    s.research_dossier = out
    s.audit_trail.append(
        AgentOutput(agent="pesquisador", stage="research", content=out[:500] + "...")
    )
    return _to_dict(s)


def faith_specialist(state: dict) -> dict:
    s = _ctx(state)
    if s.blocked:
        return _to_dict(s)
    out = invoke_agent(
        prompts.FAITH_SPECIALIST,
        _user_block(s, f"DOSSIÊ:\n{s.research_dossier}"),
    )
    if "REJEITAR:" in out.upper():
        s.blocked = True
        s.block_reason = out
        s.audit_trail.append(
            AgentOutput(
                agent="especialista_fe",
                stage="faith",
                content=out,
                approved=False,
                rejection_reason=out,
            )
        )
        return _to_dict(s)
    s.faith_review = out
    s.audit_trail.append(AgentOutput(agent="especialista_fe", stage="faith", content=out[:500]))
    return _to_dict(s)


def science_specialist(state: dict) -> dict:
    s = _ctx(state)
    if s.blocked:
        return _to_dict(s)
    out = invoke_agent(
        prompts.SCIENCE_SPECIALIST,
        _user_block(
            s,
            f"DOSSIÊ:\n{s.research_dossier}\n\nPARECER FÉ:\n{s.faith_review}",
        ),
    )
    if "REJEITAR:" in out.upper():
        s.blocked = True
        s.block_reason = out
        s.audit_trail.append(
            AgentOutput(
                agent="especialista_ciencia",
                stage="science",
                content=out,
                approved=False,
                rejection_reason=out,
            )
        )
        return _to_dict(s)
    match = re.search(r"N[ÍI]VEL DE CONFIAN[ÇC]A[:\s]*([0-9.]+)", out, re.I)
    s.science_confidence = float(match.group(1)) if match else 0.7
    s.science_report = out
    s.audit_trail.append(
        AgentOutput(
            agent="especialista_ciencia",
            stage="science",
            content=out[:500],
            metadata={"confidence": s.science_confidence},
        )
    )
    return _to_dict(s)


def neuro_writer(state: dict) -> dict:
    s = _ctx(state)
    if s.blocked:
        return _to_dict(s)
    out = invoke_agent(
        prompts.NEURO_WRITER,
        _user_block(
            s,
            f"PESQUISA:\n{s.research_dossier}\n\nFÉ:\n{s.faith_review}\n\nCIÊNCIA:\n{s.science_report}",
        ),
    )
    s.written_content = out
    s.audit_trail.append(AgentOutput(agent="redator", stage="writing", content=out[:500]))
    return _to_dict(s)


def ethics_auditor(state: dict) -> dict:
    s = _ctx(state)
    if s.blocked:
        return _to_dict(s)
    out = invoke_agent(
        prompts.ETHICS_AUDITOR,
        _user_block(s, f"CONTEÚDO A AUDITAR:\n{s.written_content}"),
    )
    approved = out.strip().upper().startswith("APROVADO")
    s.ethics_approved = approved
    s.ethics_notes = out
    if not approved:
        s.blocked = True
        s.block_reason = out
    s.audit_trail.append(
        AgentOutput(
            agent="auditor_etico",
            stage="ethics",
            content=out[:500],
            approved=approved,
            rejection_reason=None if approved else out,
        )
    )
    return _to_dict(s)


def multichannel_generator(state: dict) -> dict:
    s = _ctx(state)
    if s.blocked or not s.ethics_approved:
        return _to_dict(s)
    out = invoke_agent(
        prompts.MULTICHANNEL,
        _user_block(s, f"CONTEÚDO BASE:\n{s.written_content}"),
    )
    channels: dict[str, str] = {}
    current = "raw"
    buf: list[str] = []
    for line in out.splitlines():
        if line.startswith("## "):
            if buf:
                channels[current] = "\n".join(buf).strip()
            current = line.replace("## ", "").strip().lower()
            buf = []
        else:
            buf.append(line)
    if buf:
        channels[current] = "\n".join(buf).strip()
    s.multichannel = channels or {"raw": out}
    s.audit_trail.append(
        AgentOutput(agent="multicanal", stage="multichannel", content=str(list(channels.keys())))
    )
    return _to_dict(s)


def governance(state: dict) -> dict:
    s = _ctx(state)
    if s.blocked:
        return _to_dict(s)
    out = invoke_agent(
        prompts.GOVERNANCE,
        _user_block(
            s,
            f"CONTEÚDO:\n{s.written_content}\n\nCANAIS: {list(s.multichannel.keys())}",
        ),
    )
    approved = out.strip().upper().startswith("APROVADO")
    s.governance_approved = approved
    s.governance_notes = out
    if not approved:
        s.blocked = True
        s.block_reason = out
    s.audit_trail.append(
        AgentOutput(
            agent="governanca",
            stage="governance",
            content=out[:500],
            approved=approved,
        )
    )
    return _to_dict(s)


def should_continue_after_ethics(state: dict) -> str:
    s = _ctx(state)
    if s.blocked or not s.ethics_approved:
        return "blocked"
    return "multichannel"


def should_publish(state: dict) -> str:
    s = _ctx(state)
    if s.blocked or not s.governance_approved:
        return "blocked"
    return "done"
