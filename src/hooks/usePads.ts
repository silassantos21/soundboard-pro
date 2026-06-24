import { useCallback, useEffect, useState } from 'react';
import {
  createPad,
  deletePad,
  incrementPlayCount,
  listPads,
  toggleFavorite,
  updatePad,
} from '../services/soundPads';
import { uploadAudio } from '../lib/storage';
import type { CreateSoundPadInput, SoundPad } from '../types';

export function usePads() {
  const [pads, setPads] = useState<SoundPad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPads = useCallback(async () => {
    try {
      setLoading(true);
      const data = await listPads();
      setPads(data);
      setError(null);
    } catch (err: any) {
      setError(err?.message ?? 'Erro ao carregar pads');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPads();
  }, [fetchPads]);

  const addPad = useCallback(async (input: CreateSoundPadInput) => {
    const { path, url } = await uploadAudio(input.audioUri, input.audioFileName);
    const newPad = await createPad({
      title: input.title,
      color: input.color,
      audio_path: path,
      audio_url: url,
    });
    setPads((prev) => [...prev, newPad]);
  }, []);

  const editPad = useCallback(async (id: string, title: string, color: string) => {
    const updated = await updatePad(id, { title, color });
    setPads((prev) => prev.map((p) => (p.id === id ? updated : p)));
  }, []);

  const removePad = useCallback(async (id: string, audioPath: string) => {
    await deletePad(id, audioPath);
    setPads((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const favoritePad = useCallback(async (id: string, isFavorite: boolean) => {
    const updated = await toggleFavorite(id, isFavorite);
    setPads((prev) => {
      const next = prev.map((p) => (p.id === id ? updated : p));
      return [...next].sort((a, b) => {
        if (a.is_favorite !== b.is_favorite) return a.is_favorite ? -1 : 1;
        return a.position - b.position;
      });
    });
  }, []);

  const playPad = useCallback(async (id: string) => {
    await incrementPlayCount(id);
    setPads((prev) =>
      prev.map((p) => (p.id === id ? { ...p, play_count: p.play_count + 1 } : p)),
    );
  }, []);

  return { pads, loading, error, fetchPads, addPad, editPad, removePad, favoritePad, playPad };
}
