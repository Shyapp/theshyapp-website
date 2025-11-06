'use client';

import { useEffect, useRef, useState } from 'react';

type SoundEffect = 'hover' | 'click' | 'transition' | 'success' | 'notification';

const SOUND_URLS: Record<SoundEffect, string> = {
  hover: '/sounds/hover.mp3',
  click: '/sounds/click.mp3',
  transition: '/sounds/whoosh.mp3',
  success: '/sounds/success.mp3',
  notification: '/sounds/pop.mp3',
};

/**
 * Hook for playing subtle sound effects
 * Respects user preferences and provides mute control
 */
export function useSoundEffects() {
  const [isMuted, setIsMuted] = useState(true); // Start muted
  const audioContext = useRef<Map<SoundEffect, HTMLAudioElement>>(new Map());

  useEffect(() => {
    // Preload sound effects
    Object.entries(SOUND_URLS).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.volume = 0.3; // Subtle volume
      audio.preload = 'auto';
      audioContext.current.set(key as SoundEffect, audio);
    });

    return () => {
      // Cleanup
      audioContext.current.forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
      audioContext.current.clear();
    };
  }, []);

  const play = (effect: SoundEffect) => {
    if (isMuted) return;
    
    const audio = audioContext.current.get(effect);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  };

  const toggleMute = () => setIsMuted(!isMuted);

  return { play, isMuted, toggleMute };
}

/**
 * Sound toggle button component
 */
export function SoundToggle() {
  const { isMuted, toggleMute } = useSoundEffects();

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
      aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
    >
      {isMuted ? (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-shy-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
    </button>
  );
}
