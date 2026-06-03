-- Evangelho Digital — schema inicial
-- LGPD + auditoria + pgvector para busca semântica

CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Taxonomia e centros
CREATE TYPE content_pillar AS ENUM (
  'fe', 'ciencia', 'tecnologia', 'familia', 'educacao', 'criacao'
);

CREATE TYPE content_status AS ENUM (
  'draft', 'in_pipeline', 'pending_review', 'approved', 'published', 'rejected', 'archived'
);

CREATE TYPE pipeline_stage AS ENUM (
  'research', 'faith', 'science', 'writing', 'ethics', 'multichannel', 'governance', 'published'
);

-- Conteúdo editorial (gerado pelo pipeline multiagente)
CREATE TABLE content_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  body TEXT,
  pillar content_pillar NOT NULL,
  center_slug TEXT NOT NULL,
  status content_status NOT NULL DEFAULT 'draft',
  current_stage pipeline_stage,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Auditoria do pipeline (nenhum estágio ignorado)
CREATE TABLE pipeline_audit (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id UUID NOT NULL REFERENCES content_items(id) ON DELETE CASCADE,
  stage pipeline_stage NOT NULL,
  agent_name TEXT NOT NULL,
  input_hash TEXT,
  output JSONB NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT FALSE,
  rejection_reason TEXT,
  model_provider TEXT DEFAULT 'groq',
  model_id TEXT,
  duration_ms INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_pipeline_audit_content ON pipeline_audit(content_id, stage);

-- Embeddings para memória institucional e busca semântica
CREATE TABLE knowledge_embeddings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_path TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1536),
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (source_path, chunk_index)
);

CREATE INDEX idx_knowledge_embedding ON knowledge_embeddings
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Trilhas e progresso do usuário
CREATE TABLE learning_trails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  duration_weeks INTEGER,
  center_slug TEXT NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_trail_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  trail_id UUID NOT NULL REFERENCES learning_trails(id) ON DELETE CASCADE,
  current_step INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, trail_id)
);

-- Missões diárias (sem gamificação viciante)
CREATE TABLE daily_missions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trail_id UUID REFERENCES learning_trails(id),
  day_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  action_description TEXT NOT NULL,
  reflection_prompt TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_mission_completions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  mission_id UUID NOT NULL REFERENCES daily_missions(id) ON DELETE CASCADE,
  reflection_text TEXT,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, mission_id)
);

-- Diário digital
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  prompt TEXT,
  content TEXT NOT NULL,
  is_private BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS — habilitar após configurar Supabase Auth
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_trail_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

-- Políticas públicas: apenas conteúdo publicado
CREATE POLICY content_public_read ON content_items
  FOR SELECT USING (status = 'published');

CREATE POLICY journal_owner ON journal_entries
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY trail_progress_owner ON user_trail_progress
  FOR ALL USING (auth.uid() = user_id);

-- Trigger updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER content_items_updated_at
  BEFORE UPDATE ON content_items
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
