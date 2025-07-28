import React, { useState, useRef, useEffect } from 'react';
import { Dialogue, Intonation } from '../types';
import { PlayIcon, PauseIcon, DownloadIcon } from './icons';

interface DialoguePlayerProps {
  dialogue: Dialogue;
}

const IntonationBadge: React.FC<{ intonation: Intonation }> = ({ intonation }) => {
  const getBadgeStyle = () => {
    switch (intonation) {
      case Intonation.Calm:
        return 'bg-blue-100 text-blue-800';
      case Intonation.Whispered:
        return 'bg-slate-100 text-slate-800';
      case Intonation.Shouted:
        return 'bg-red-100 text-red-800';
      case Intonation.Normal:
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${getBadgeStyle()}`}>
      {intonation}
    </span>
  );
};

const DialoguePlayer: React.FC<DialoguePlayerProps> = ({ dialogue }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      // Pause all other audio elements before playing a new one
      document.querySelectorAll('audio').forEach(audio => audio.pause());
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const onEnded = () => setIsPlaying(false);
    const onPause = () => {
        // This can be triggered by another audio playing, so sync state
        if (isPlaying && audioEl.paused) {
            setIsPlaying(false);
        }
    };

    audioEl.addEventListener('ended', onEnded);
    audioEl.addEventListener('pause', onPause);
    
    return () => {
      audioEl.removeEventListener('ended', onEnded);
      audioEl.removeEventListener('pause', onPause);
    }
  }, [isPlaying]);


  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors duration-200">
      <div className="flex-grow">
        <p className="text-lg text-slate-700 mb-2">"{dialogue.text}"</p>
        <IntonationBadge intonation={dialogue.intonation} />
      </div>
      <div className="flex items-center space-x-3 ml-4">
        <audio ref={audioRef} src={dialogue.audioSrc} preload="none"></audio>
        <button
          onClick={togglePlayPause}
          className="p-2 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <PauseIcon className="w-5 h-5"/> : <PlayIcon className="w-5 h-5"/>}
        </button>
        <a
          href={dialogue.audioSrc}
          download
          className="p-2 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
          aria-label="Télécharger"
        >
          <DownloadIcon />
        </a>
      </div>
    </div>
  );
};

export default DialoguePlayer;