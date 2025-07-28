
import React from 'react';
import { Character } from '../types';
import CharacterCard from './CharacterCard';
import { PlusIcon } from './icons';

interface CharacterSelectionPageProps {
  characters: Character[];
  onSelectCharacter: (character: Character) => void;
  isAdmin: boolean;
}

const CharacterSelectionPage: React.FC<CharacterSelectionPageProps> = ({ characters, onSelectCharacter, isAdmin }) => {
  const handleAddClick = () => {
    alert("Fonctionnalité d'ajout réservée aux administrateurs. Bientôt disponible !");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Choisissez un Personnage
        </h2>
        <p className="mt-4 text-xl text-slate-600">
          Cliquez sur une carte pour explorer les dialogues.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} onSelect={onSelectCharacter} />
        ))}
        {isAdmin && (
          <button
            onClick={handleAddClick}
            className="flex items-center justify-center w-full bg-white rounded-xl border-2 border-dashed border-slate-300 hover:border-indigo-500 hover:text-indigo-500 transition-all duration-300 text-slate-500 py-8 group"
          >
            <div className="text-center">
              <PlusIcon className="mx-auto h-12 w-12" />
              <span className="mt-2 block text-sm font-medium">Ajouter une voix</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default CharacterSelectionPage;
