import { useAudioContext } from '../../contexts/AudioContext';

interface AudioPlayerProps {
  variant?: 'fixed' | 'inline';
}

export default function AudioPlayer({ variant = 'inline' }: AudioPlayerProps): JSX.Element {
  const { isMuted, toggleMute } = useAudioContext();

  const buttonClasses =
    variant === 'fixed'
      ? 'clickable fixed bottom-6 right-6 z-50 rounded-full border border-neutral-700/50 bg-neutral-800/50 p-3 backdrop-blur-sm transition-all duration-300 hover:border-primary-600/50 hover:bg-primary-700/50'
      : 'clickable rounded-full border border-neutral-300 bg-neutral-100 p-2.5 transition-all duration-300 hover:border-primary-500 hover:bg-primary-100 dark:border-neutral-700/50 dark:bg-neutral-800/50 dark:hover:border-primary-600/50 dark:hover:bg-primary-700/50';

  return (
    <button onClick={toggleMute} className={buttonClasses} aria-label="Toggle mute">
      {isMuted ? (
        <svg
          className="h-6 w-6 text-neutral-600 transition-colors duration-300 dark:text-neutral-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
          />
        </svg>
      ) : (
        <svg
          className="h-6 w-6 text-neutral-700 transition-colors duration-300 hover:text-primary-500 dark:text-neutral-300 dark:hover:text-primary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </svg>
      )}
    </button>
  );
}
