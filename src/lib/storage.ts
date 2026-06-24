import * as FileSystem from 'expo-file-system/legacy';
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

  // content:// URIs (copyToCacheDirectory: false) são lidos pelo ContentResolver
  // do Android via expo-file-system — diferente de fetch() que usa java.net.URL
  // e não reconhece o protocolo content://.
  const base64 = await FileSystem.readAsStringAsync(localUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `${Date.now()}_${safeName}`;

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
