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

  // fetch() acessa content:// e file:// URIs via bridge nativa do Android/iOS,
  // contornando o sandbox do expo-file-system que bloqueia paths do DocumentPicker.
  const response = await fetch(localUri);
  if (!response.ok && response.status !== 0) {
    throw new Error(`Não foi possível ler o arquivo (status ${response.status}).`);
  }
  const blob = await response.blob();

  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `${Date.now()}_${safeName}`;

  const { data, error } = await supabase.storage
    .from(AUDIO_BUCKET)
    .upload(storagePath, blob, {
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
