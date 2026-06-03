FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml README.md ./
COPY src ./src

RUN pip install --no-cache-dir -e .

ENV PYTHONUNBUFFERED=1
ENV INSTITUTIONAL_MEMORY_PATH=/app/institutional-memory

CMD ["python", "-m", "agents.cli", "run", "--help"]
