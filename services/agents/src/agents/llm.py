from langchain_core.messages import HumanMessage, SystemMessage
from langchain_groq import ChatGroq

from agents.config import settings


def get_llm() -> ChatGroq:
    if not settings.groq_api_key:
        raise ValueError(
            "GROQ_API_KEY não configurada. Defina em services/agents/.env"
        )
    return ChatGroq(
        api_key=settings.groq_api_key,
        model=settings.groq_model,
        temperature=0.3,
        max_tokens=4096,
    )


def invoke_agent(system_prompt: str, user_prompt: str) -> str:
    llm = get_llm()
    response = llm.invoke(
        [
            SystemMessage(content=system_prompt),
            HumanMessage(content=user_prompt),
        ]
    )
    return str(response.content)
