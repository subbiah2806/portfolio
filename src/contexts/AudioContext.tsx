import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from 'react';

// Extend Window interface to include webkitAudioContext
declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
  children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
  // Initialize from localStorage, default to unmuted (false)
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('audioMuted');
    return stored === null ? false : stored === 'true';
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playClickSound = useCallback((): void => {
    if (isMuted) {
      return;
    }
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }, [isMuted]);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.muted = isMuted;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isMuted]);

  // Store playClickSound in a ref to avoid re-registering the event listener
  const playClickSoundRef = useRef(playClickSound);

  useEffect(() => {
    playClickSoundRef.current = playClickSound;
  }, [playClickSound]);

  // Single click event listener for the entire app
  useEffect(() => {
    const handleClick = (): void => {
      playClickSoundRef.current();
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []); // Empty deps - listener is stable

  const toggleMute = (): void => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    localStorage.setItem('audioMuted', String(newMutedState));
    if (audioRef.current) {
      audioRef.current.muted = newMutedState;
    }
  };

  const value: AudioContextType = {
    isMuted,
    toggleMute,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAudioContext() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return context;
}
