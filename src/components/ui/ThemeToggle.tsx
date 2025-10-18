import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from '../../contexts';
import { Button } from './button';
import { cn } from '../../lib/utils';

interface ThemeToggleProps {
  onToggle?: () => void;
}

export default function ThemeToggle({ onToggle }: ThemeToggleProps): JSX.Element {
  const { isDark, toggleTheme: handleToggle } = useThemeContext();

  const toggleTheme = (): void => {
    handleToggle();
    if (onToggle) onToggle();
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={cn('clickable rounded-full')}
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
