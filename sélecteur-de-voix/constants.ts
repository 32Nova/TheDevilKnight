import { Character, Intonation } from './types';

// Utilisation d'une URL publique pour un son de substitution afin d'éviter les erreurs de chargement.
const PLACEHOLDER_AUDIO_URL = 'https://ssl.gstatic.com/dictionary/static/sounds/20200429/click_1--_3-1.mp3';

export const CHARACTERS_DATA: Character[] = [
  {
    id: 'etienne',
    name: 'Étienne',
    description: "Connu pour son franc-parler et ses répliques cultes. Chaque phrase est une pépite.",
    avatarUrl: 'https://picsum.photos/seed/etienne/400/400',
    dialogues: [
      { id: 1, text: "C'est pas bon.", audioSrc: PLACEHOLDER_AUDIO_URL, intonation: Intonation.Normal },
      { id: 2, text: "Ah, la fatigue...", audioSrc: PLACEHOLDER_AUDIO_URL, intonation: Intonation.Normal },
      { id: 3, text: "On n'est pas sortis de l'auberge.", audioSrc: PLACEHOLDER_AUDIO_URL, intonation: Intonation.Normal },
      { id: 4, text: "Franchement, c'est une masterclass.", audioSrc: PLACEHOLDER_AUDIO_URL, intonation: Intonation.Shouted },
      { id: 5, text: "J'ai besoin d'un café, là.", audioSrc: PLACEHOLDER_AUDIO_URL, intonation: Intonation.Whispered },
    ],
  },
  {
    id: 'charles',
    name: 'Charles',
    description: "Le boute-en-train du groupe. Ses phrases sont souvent pleines d'humour et de légèreté.",
    avatarUrl: 'https://picsum.photos/seed/charles/400/400',
    dialogues: [
      { id: 1, text: "Alors ça, c'est exceptionnel !", audioSrc: PLACEHOLDER_AUDIO_URL, intonation: Intonation.Shouted },
      { id: 2, text: "Qui veut une part de gâteau ?", audioSrc: PLACEHOLDER_AUDIO_URL, intonation: Intonation.Normal },
      { id: 3, text: "C'est une blague ? J'espère.", audioSrc: PLACEHOLDER_AUDIO_URL, intonation: Intonation.Whispered },
      { id: 4, text: "Laissez-moi deviner...", audioSrc: PLACEHOLDER_AUDIO_URL, intonation: Intonation.Calm },
      { id: 5, text: "On va bien s'amuser.", audioSrc: PLACEHOLDER_AUDIO_URL, intonation: Intonation.Normal },
    ],
  },
  {
    id: 'leane',
    name: 'Léane',
    description: "La voix de la raison. Ses dialogues sont posés, réfléchis, mais parfois teintés d'ironie.",
    avatarUrl: 'https://picsum.photos/seed/leane/400/400',
    dialogues: [
      { id: 1, text: "Est-ce qu'on a vraiment réfléchi à ça ?", audioSrc: PLACEHOLDER_AUDIO_URL, intonation: Intonation.Calm },
      { id: 2, text: "Je ne suis pas convaincue.", audioSrc: PLACEHOLDER_AUDIO_URL, intonation: Intonation.Normal },
      { id: 3, text: "C'est une idée intéressante, explorons-la.", audioSrc: PLACEHOLDER_AUDIO_URL, intonation: Intonation.Normal },
      { id: 4, text: "D'accord, mais avec des réserves.", audioSrc: PLACEHOLDER_AUDIO_URL, intonation: Intonation.Whispered },
      { id: 5, text: "Je vous l'avais bien dit.", audioSrc: PLACEHOLDER_AUDIO_URL, intonation: Intonation.Normal },
    ],
  },
];