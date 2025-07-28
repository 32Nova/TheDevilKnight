import React, { useState, useEffect } from 'react';
import { Character, Intonation } from './types';
import { CHARACTERS_DATA } from './constants';
import Header from './components/Header';
import CharacterSelectionPage from './components/CharacterSelectionPage';
import CharacterDetailPage from './components/CharacterDetailPage';

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>(CHARACTERS_DATA);
  const [viewState, setViewState] = useState<{
    page: 'selection' | 'detail';
    characterId: string | null;
  }>({ page: 'selection', characterId: null });
  
  const [animationClass, setAnimationClass] = useState('');
  const [isAdmin, setIsAdmin] = useState(true); // Always admin

  useEffect(() => {
    setAnimationClass('page-enter');
    // Admin status is now set by default, no need to check URL
  }, []);
  
  const changePage = (page: 'selection' | 'detail', characterId: string | null = null) => {
    setAnimationClass('page-exit');
    
    setTimeout(() => {
      setViewState({ page, characterId });
      setAnimationClass('page-enter');
    }, 300);
  };

  const handleSelectCharacter = (character: Character) => {
    changePage('detail', character.id);
  };

  const handleBackToSelection = () => {
    changePage('selection');
  };

  const handleAddDialogue = (characterId: string, text: string, audioFile: File, intonation: Intonation) => {
    const audioSrc = URL.createObjectURL(audioFile);
    
    setCharacters(prevCharacters => 
      prevCharacters.map(char => {
        if (char.id === characterId) {
          const newDialogue = {
            id: Date.now(), // Using timestamp for a simple unique ID
            text,
            audioSrc,
            intonation,
          };
          return {
            ...char,
            dialogues: [newDialogue, ...char.dialogues], // Prepend new dialogue
          };
        }
        return char;
      })
    );
  };

  const selectedCharacter = viewState.page === 'detail' && viewState.characterId
    ? characters.find(c => c.id === viewState.characterId)
    : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className={`page-transition-wrapper ${animationClass}`}>
        {viewState.page === 'detail' && selectedCharacter ? (
          <CharacterDetailPage 
            character={selectedCharacter} 
            onBack={handleBackToSelection}
            isAdmin={isAdmin}
            onAddDialogue={handleAddDialogue}
          />
        ) : (
          <CharacterSelectionPage
            characters={characters}
            onSelectCharacter={handleSelectCharacter}
            isAdmin={isAdmin}
          />
        )}
      </main>
    </div>
  );
};

export default App;
