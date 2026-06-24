import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { supabase, AUDIO_BUCKET } from './supabase';

const ALLOWED_MIME: Record<string, string> = {
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  ogg: 'audio/ogg',
  m4a: 'audio/x-m4a',
  aac: 'audio/aac',
};

export async function uploadAudio(
  localUri: string,
  fileName: string,
): Promise<{ path: string; url: string }> {
  const ext = fileName.split('.').pop()?.toLowerCase() ?? '';
  const mimeType = ALLOWED_MIME[ext];

  if (!mimeType) {
    throw new Error(`Formato não suportado: .${ext}. Use MP3, WAV, OGG, M4A ou AAC.`);
  }

  const base64 = await FileSystem.readAsStringAsync(localUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const storagePath = `${Date.now()}_${fileName.replace(/\s+/g, '_')}`;

  const { data, error } = await supabase.storage
    .from(AUDIO_BUCKET)
    .upload(storagePath, decode(base64), {
      contentType: mimeType,
      upsert: false,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from(AUDIO_BUCKET)
    .getPublicUrl(data.path);

  return { path: data.path, url: urlData.publicUrl };
}

export async function deleteAudio(path: string): Promise<void> {
  const { error } = await supabase.storage.from(AUDIO_BUCKET).remove([path]);
  if (error) throw error;
}
