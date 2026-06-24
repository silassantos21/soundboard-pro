import { supabase } from '../lib/supabase';
import { deleteAudio } from '../lib/storage';
import type { SoundPad, UpdateSoundPadInput } from '../types';

export async function listPads(): Promise<SoundPad[]> {
  const { data, error } = await supabase
    .from('sound_pads')
    .select('*')
    .order('is_favorite', { ascending: false })
    .order('position', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function createPad(
  input: Pick<SoundPad, 'title' | 'color' | 'audio_url' | 'audio_path'>,
): Promise<SoundPad> {
  const { data: existing } = await supabase
    .from('sound_pads')
    .select('position')
    .order('position', { ascending: false })
    .limit(1)
    .maybeSingle();

  const position = existing ? existing.position + 1 : 0;

  const { data, error } = await supabase
    .from('sound_pads')
    .insert({ ...input, position })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePad(id: string, input: UpdateSoundPadInput): Promise<SoundPad> {
  const { data, error } = await supabase
    .from('sound_pads')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePad(id: string, audioPath: string): Promise<void> {
  // Tenta remover o arquivo; se já não existir, segue em frente
  try {
    await deleteAudio(audioPath);
  } catch {
    // arquivo pode já ter sido removido manualmente — não bloqueia a exclusão do registro
  }

  const { error } = await supabase
    .from('sound_pads')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function incrementPlayCount(id: string): Promise<void> {
  const { error } = await supabase.rpc('increment_play_count', { pad_id: id });
  if (error) throw error;
}

export async function toggleFavorite(id: string, isFavorite: boolean): Promise<SoundPad> {
  return updatePad(id, { is_favorite: !isFavorite });
}
