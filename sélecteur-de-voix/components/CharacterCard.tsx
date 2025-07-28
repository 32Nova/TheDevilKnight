
import React from 'react';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(character)}
      className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:h-full md:w-48" src={character.avatarUrl} alt={`Avatar de ${character.name}`} />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{character.name}</div>
          <p className="mt-2 text-slate-500">{character.description}</p>
          <div className="mt-4">
              <span className="text-indigo-600 group-hover:text-indigo-800 font-medium">
                Voir les dialogues &rarr;
              </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
