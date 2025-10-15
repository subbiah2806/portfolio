import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CursorContextType {
  isEnabled: boolean;
  toggleCursor: () => void;
  canUseCursor: boolean;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

interface CursorProviderProps {
  children: ReactNode;
}

export function CursorProvider({ children }: CursorProviderProps) {
  // Check device capabilities
  const canUseCursor =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize cursor state from localStorage, default to enabled
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('customCursorEnabled');
    // Default to true if no preference is stored and device supports it
    return stored === null ? canUseCursor : stored === 'true';
  });

  const toggleCursor = (): void => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    localStorage.setItem('customCursorEnabled', String(newValue));
  };

  // Inject CSS rule once on mount
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent = 'body.custom-cursor-enabled * { cursor: none !important; }';
    document.head.appendChild(style);

    return () => {
      const styleElement = document.getElementById('custom-cursor-style');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);

  // Toggle class based on cursor state
  useEffect(() => {
    if (isEnabled && canUseCursor) {
      document.body.classList.add('custom-cursor-enabled');
    } else {
      document.body.classList.remove('custom-cursor-enabled');
    }

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, [isEnabled, canUseCursor]);

  const value: CursorContextType = {
    isEnabled: isEnabled && canUseCursor,
    toggleCursor,
    canUseCursor,
  };

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCursorContext() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursorContext must be used within a CursorProvider');
  }
  return context;
}
