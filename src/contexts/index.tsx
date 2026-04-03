import { ReactNode } from 'react';

interface GlobalProvidersProps {
  children: ReactNode;
}

/**
 * GlobalProviders - Combines all context providers for the application
 *
 */
export function GlobalProviders({ children }: GlobalProvidersProps) {
  return children;
}
