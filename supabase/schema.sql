-- SoundBoard Pro — Schema do Banco de Dados
-- Execute este arquivo no SQL Editor do Supabase

-- MIGRATION: renomear coluna color → emoji (rodar uma vez no Supabase SQL Editor)
-- ALTER TABLE sound_pads RENAME COLUMN color TO emoji;
-- ALTER TABLE sound_pads ALTER COLUMN emoji SET DEFAULT '🎵';

-- Tabela principal de pads
CREATE TABLE IF NOT EXISTS sound_pads (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT        NOT NULL,
  emoji       TEXT        NOT NULL DEFAULT '🎵',
  audio_url   TEXT        NOT NULL,
  audio_path  TEXT        NOT NULL,
  play_count  INTEGER     NOT NULL DEFAULT 0,
  is_favorite BOOLEAN     NOT NULL DEFAULT FALSE,
  position    INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sound_pads_updated_at
  BEFORE UPDATE ON sound_pads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security (RLS)
ALTER TABLE sound_pads ENABLE ROW LEVEL SECURITY;

-- Política: acesso total (uso pessoal, sem autenticação)
CREATE POLICY "allow_all_personal_use" ON sound_pads
  FOR ALL USING (true) WITH CHECK (true);

-- Índice para ordenação por favoritos + posição
CREATE INDEX idx_sound_pads_order ON sound_pads (is_favorite DESC, position ASC);

-- Storage bucket para arquivos de áudio
-- Execute manualmente no Supabase Dashboard → Storage → New Bucket
-- Nome: audio
-- Public: true
-- File size limit: 5242880 (5MB)
-- Allowed MIME types: audio/mpeg, audio/wav, audio/ogg, audio/mp4, audio/x-m4a
