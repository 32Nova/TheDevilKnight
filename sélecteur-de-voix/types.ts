export enum Intonation {
  Calm = 'calme',
  Normal = 'normal',
  Whispered = 'chuchoté',
  Shouted = 'crié',
}

export interface Dialogue {
  id: number;
  text: string;
  audioSrc: string; // URL to the audio file
  intonation: Intonation;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  dialogues: Dialogue[];
}