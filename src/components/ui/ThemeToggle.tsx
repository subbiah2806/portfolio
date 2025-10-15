import { useThemeContext } from '../../contexts';

interface ThemeToggleProps {
  onToggle?: () => void;
  variant?: 'fixed' | 'inline';
}

export default function ThemeToggle({
  onToggle,
  variant = 'inline',
}: ThemeToggleProps): JSX.Element {
  const { isDark, toggleTheme: handleToggle } = useThemeContext();

  const toggleTheme = (): void => {
    handleToggle();
    if (onToggle) onToggle();
  };

  const buttonClasses =
    variant === 'fixed'
      ? 'clickable fixed right-6 top-6 z-50 rounded-full border border-neutral-700/50 bg-neutral-800/50 p-3 backdrop-blur-sm transition-all duration-300 hover:border-primary-600/50 hover:bg-primary-700/50'
      : 'clickable rounded-full border border-neutral-300 bg-neutral-100 p-2.5 transition-all duration-300 hover:border-primary-500 hover:bg-primary-100 dark:border-neutral-700/50 dark:bg-neutral-800/50 dark:hover:border-primary-600/50 dark:hover:bg-primary-700/50';

  return (
    <button onClick={toggleTheme} className={buttonClasses} aria-label="Toggle theme">
      {isDark ? (
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
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          className="h-6 w-6 text-neutral-700 transition-colors duration-300 hover:text-primary-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}
