import { useCursorContext } from '../../contexts/CursorContext';

interface CursorToggleProps {
  onToggle?: () => void;
  variant?: 'fixed' | 'inline';
}

/**
 * Toggle button for custom cursor
 * Only shows on devices that support fine pointer and don't prefer reduced motion
 */
export default function CursorToggle({
  onToggle,
  variant = 'inline',
}: CursorToggleProps): JSX.Element | null {
  const { isEnabled, toggleCursor, canUseCursor } = useCursorContext();

  // Don't render toggle on touch devices or if user prefers reduced motion
  if (!canUseCursor) {
    return null;
  }

  const handleToggle = (): void => {
    toggleCursor();
    if (onToggle) onToggle();
  };

  const buttonClasses =
    variant === 'fixed'
      ? 'clickable fixed right-20 top-6 z-50 rounded-full border border-neutral-700/50 bg-neutral-800/50 p-3 backdrop-blur-sm transition-all duration-300 hover:border-primary-600/50 hover:bg-primary-700/50'
      : 'clickable rounded-full border border-neutral-300 bg-neutral-100 p-2.5 transition-all duration-300 hover:border-primary-500 hover:bg-primary-100 dark:border-neutral-700/50 dark:bg-neutral-800/50 dark:hover:border-primary-600/50 dark:hover:bg-primary-700/50';

  return (
    <button
      onClick={handleToggle}
      className={buttonClasses}
      aria-label={isEnabled ? 'Disable custom cursor' : 'Enable custom cursor'}
      title={isEnabled ? 'Disable custom cursor' : 'Enable custom cursor'}
    >
      {isEnabled ? (
        // Custom Cursor Enabled icon (circle with dot - represents custom cursor)
        <svg
          className="h-6 w-6 text-primary-400 transition-colors duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="8" strokeWidth={2} />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      ) : (
        // Default pointer cursor icon with arrow
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-neutral-600 transition-colors duration-300 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400"
        >
          <path
            d="M8 4 L8 18 L12 14 L15 20 L17 19 L14 13 L20 13 Z"
            fill="#000000"
            stroke="#ffffff"
            strokeWidth="1"
          />
        </svg>
      )}
    </button>
  );
}
