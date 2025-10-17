import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from '../../contexts';
import { Button } from './button';
import { cn } from '../../lib/utils';

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

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        'clickable rounded-full',
        variant === 'fixed' &&
          'fixed right-6 top-6 z-50 border border-border bg-background/50 backdrop-blur-sm'
      )}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 transition-colors" />
      ) : (
        <Moon className="h-5 w-5 transition-colors" />
      )}
    </Button>
  );
}
