from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    groq_api_key: str = ""
    groq_model: str = "llama-3.3-70b-versatile"
    database_url: str = ""
    redis_url: str = "redis://localhost:6379/0"
    institutional_memory_path: str = "../../docs/institutional-memory"
    otel_service_name: str = "evangelho-agents"
    otel_exporter_otlp_endpoint: str = ""

    @property
    def memory_dir(self) -> Path:
        # services/agents/src/agents/config.py → services/agents
        base = Path(__file__).resolve().parents[2]
        path = Path(self.institutional_memory_path)
        if path.is_absolute():
            return path
        return (base / path).resolve()


settings = Settings()
