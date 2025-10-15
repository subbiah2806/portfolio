import { ReactNode } from 'react';
import { ThemeProvider } from './ThemeContext';
import { AudioProvider } from './AudioContext';
import { CursorProvider } from './CursorContext';

interface GlobalProvidersProps {
  children: ReactNode;
}

/**
 * GlobalProviders - Combines all context providers for the application
 *
 * Order matters:
 * 1. ThemeProvider - Should be outermost as theme affects everything
 * 2. AudioProvider - Audio system
 * 3. CursorProvider - Custom cursor (uses theme)
 */
export function GlobalProviders({ children }: GlobalProvidersProps) {
  return (
    <ThemeProvider>
      <AudioProvider>
        <CursorProvider>{children}</CursorProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}

// Re-export context hooks for convenience
// eslint-disable-next-line react-refresh/only-export-components
export { useThemeContext } from './ThemeContext';
// eslint-disable-next-line react-refresh/only-export-components
export { useAudioContext } from './AudioContext';
// eslint-disable-next-line react-refresh/only-export-components
export { useCursorContext } from './CursorContext';
