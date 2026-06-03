"""Orquestrador LangGraph — pipeline sequencial obrigatório."""

from langgraph.graph import END, StateGraph

from agents import nodes
from agents.schemas import Pillar, PipelineInput, PipelineState


def build_pipeline_graph():
    """
    Pesquisa → Fé → Ciência → Redação → Ética → Multicanal → Governança → Fim
    Nenhum estágio pode ser ignorado.
    """
    graph = StateGraph(dict)

    graph.add_node("init_memory", nodes.init_memory)
    graph.add_node("research", nodes.researcher)
    graph.add_node("faith", nodes.faith_specialist)
    graph.add_node("science", nodes.science_specialist)
    graph.add_node("writing", nodes.neuro_writer)
    graph.add_node("ethics", nodes.ethics_auditor)
    graph.add_node("multichannel", nodes.multichannel_generator)
    graph.add_node("governance", nodes.governance)

    graph.set_entry_point("init_memory")
    graph.add_edge("init_memory", "research")
    graph.add_edge("research", "faith")
    graph.add_edge("faith", "science")
    graph.add_edge("science", "writing")
    graph.add_edge("writing", "ethics")

    graph.add_conditional_edges(
        "ethics",
        nodes.should_continue_after_ethics,
        {"multichannel": "multichannel", "blocked": END},
    )
    graph.add_edge("multichannel", "governance")
    graph.add_conditional_edges(
        "governance",
        nodes.should_publish,
        {"done": END, "blocked": END},
    )

    return graph.compile()


def run_pipeline(
    tema: str,
    publico_alvo: str,
    objetivo: str,
    pilar: str = "familia",
) -> PipelineState:
    app = build_pipeline_graph()
    initial = PipelineState(
        input=PipelineInput(
            tema=tema,
            publico_alvo=publico_alvo,
            objetivo=objetivo,
            pilar=Pillar(pilar),
        )
    )
    result = app.invoke(initial.model_dump())
    return PipelineState.model_validate(result)
