export interface SoundPad {
  id: string;
  title: string;
  color: string;
  audio_url: string;
  audio_path: string;
  play_count: number;
  is_favorite: boolean;
  position: number;
  created_at: string;
  updated_at: string;
}

export type CreateSoundPadInput = Pick<SoundPad, 'title' | 'color'> & {
  audioUri: string;
  audioFileName: string;
};

export type UpdateSoundPadInput = Partial<Pick<SoundPad, 'title' | 'color' | 'is_favorite' | 'position'>>;
