import React, { useState, useMemo } from 'react';
import { Character, Dialogue, Intonation } from '../types';
import DialoguePlayer from './DialoguePlayer';
import { SearchIcon, ArrowLeftIcon, PlusIcon, SparklesIcon, SpinnerIcon } from './icons';
import { GoogleGenAI } from '@google/genai';

// L'API Key est supposée être disponible via les variables d'environnement
const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

interface AddDialogueFormProps {
  character: Character;
  onAddDialogue: (characterId: string, text: string, audioFile: File, intonation: Intonation) => void;
  onCancel: () => void;
}

const AddDialogueForm: React.FC<AddDialogueFormProps> = ({ character, onAddDialogue, onCancel }) => {
    const [text, setText] = useState('');
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [intonation, setIntonation] = useState<Intonation>(Intonation.Normal);
    const [error, setError] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleSuggestDialogue = async () => {
      setIsGenerating(true);
      setError('');
      try {
        const prompt = `Génère une ligne de dialogue courte et percutante (moins de 15 mots) pour le personnage "${character.name}".\nDescription du personnage : "${character.description}".\nLa phrase doit correspondre à sa personnalité. Ne retourne que la phrase, sans guillemets, sans mise en forme et sans préfixe comme "Phrase :".`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        const suggestedText = response.text.trim();
        setText(suggestedText);

      } catch (e) {
        console.error(e);
        setError("La suggestion de dialogue a échoué. Veuillez réessayer.");
      } finally {
        setIsGenerating(false);
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!text.trim() || !audioFile) {
        setError('Veuillez remplir la phrase et sélectionner un fichier audio.');
        return;
      }
      onAddDialogue(character.id, text, audioFile, intonation);
      onCancel(); // Close form on success
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md my-6 border border-slate-200 animate-fade-in-down">
        <style>{`
          @keyframes fade-in-down {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-down { animation: fade-in-down 0.3s ease-out; }
        `}</style>
        <form onSubmit={handleSubmit} noValidate>
          <h3 className="text-xl font-semibold mb-4 text-slate-800">Ajouter un nouveau dialogue</h3>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="space-y-4">
            <div>
              <label htmlFor="dialogue-text" className="block text-sm font-medium text-slate-700 mb-1">Phrase du dialogue</label>
              <div className="flex items-center gap-2">
                <input type="text" id="dialogue-text" value={text} onChange={e => setText(e.target.value)} required className="flex-grow block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Ex: C'est pas bon."/>
                <button
                  type="button"
                  onClick={handleSuggestDialogue}
                  disabled={isGenerating}
                  className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Suggérer une phrase"
                >
                  {isGenerating ? (
                    <>
                      <SpinnerIcon className="w-5 h-5"/>
                      <span className="hidden sm:inline">Génération...</span>
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="w-5 h-5" />
                      <span className="hidden sm:inline">Suggérer</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="dialogue-intonation" className="block text-sm font-medium text-slate-700">Intonation</label>
              <select id="dialogue-intonation" value={intonation} onChange={e => setIntonation(e.target.value as Intonation)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md capitalize">
                {Object.values(Intonation).map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="dialogue-audio" className="block text-sm font-medium text-slate-700">Fichier audio</label>
              <input type="file" id="dialogue-audio" accept="audio/*" required onChange={e => setAudioFile(e.target.files ? e.target.files[0] : null)} className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
              {audioFile && <p className="text-sm text-slate-500 mt-1">Fichier : {audioFile.name}</p>}
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Annuler</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Ajouter le dialogue</button>
          </div>
        </form>
      </div>
    );
};

interface CharacterDetailPageProps {
  character: Character;
  onBack: () => void;
  isAdmin: boolean;
  onAddDialogue: (characterId: string, text: string, audioFile: File, intonation: Intonation) => void;
}

const CharacterDetailPage: React.FC<CharacterDetailPageProps> = ({ character, onBack, isAdmin, onAddDialogue }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const filteredDialogues = useMemo(() => {
    if (!searchTerm) {
      return character.dialogues;
    }
    return character.dialogues.filter(dialogue =>
      dialogue.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, character.dialogues]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-indigo-600 mb-8 transition-colors duration-200"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span>Retour à la sélection</span>
      </button>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
            <img className="h-24 w-24 rounded-full object-cover shadow-lg" src={character.avatarUrl} alt={`Avatar de ${character.name}`} />
            <div>
                <h2 className="text-4xl font-bold text-slate-900">{character.name}</h2>
                <p className="text-slate-500 mt-1">{character.description}</p>
            </div>
        </div>
      </div>
      
      <div className="sticky top-0 bg-slate-50 py-4 z-10">
        <div className="flex gap-4 items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher une phrase..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm"
              />
            </div>
            {isAdmin && !isAdding && (
                 <button onClick={() => setIsAdding(true)} className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
                     <PlusIcon className="w-5 h-5" />
                     <span className="text-sm font-medium hidden sm:inline">Ajouter</span>
                 </button>
            )}
        </div>
      </div>

      {isAdding && isAdmin && <AddDialogueForm character={character} onAddDialogue={onAddDialogue} onCancel={() => setIsAdding(false)} />}

      <div className="mt-6 space-y-4">
        {filteredDialogues.length > 0 ? (
          filteredDialogues.map(dialogue => (
            <DialoguePlayer key={dialogue.id} dialogue={dialogue} />
          ))
        ) : (
          <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-slate-900">Aucun dialogue trouvé</h3>
            <p className="mt-1 text-sm text-slate-500">Essayez un autre terme de recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterDetailPage;