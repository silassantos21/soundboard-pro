-- Execute no SQL Editor do Supabase (após o schema.sql)
-- Função para incrementar play_count de forma atômica

CREATE OR REPLACE FUNCTION increment_play_count(pad_id UUID)
RETURNS void
LANGUAGE sql
AS $$
  UPDATE sound_pads SET play_count = play_count + 1 WHERE id = pad_id;
$$;
