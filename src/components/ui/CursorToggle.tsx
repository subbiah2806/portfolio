import { MousePointer2, Circle } from 'lucide-react';
import { useCursorContext } from '../../contexts/CursorContext';
import { Button } from './button';
import { cn } from '../../lib/utils';

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

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={cn(
        'clickable rounded-full',
        variant === 'fixed' &&
          'fixed right-20 top-6 z-50 border border-border bg-background/50 backdrop-blur-sm'
      )}
      aria-label={isEnabled ? 'Disable custom cursor' : 'Enable custom cursor'}
      title={isEnabled ? 'Disable custom cursor' : 'Enable custom cursor'}
    >
      {isEnabled ? (
        <Circle className="h-5 w-5 fill-current transition-colors" />
      ) : (
        <MousePointer2 className="h-5 w-5 transition-colors" />
      )}
    </Button>
  );
}
