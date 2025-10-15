import { useState } from 'react';

/**
 * Test Component for ErrorBoundary
 *
 * This component can be temporarily added to the app to test the error boundary.
 * Clicking the button will throw an error that the ErrorBoundary should catch.
 *
 * Usage in App.tsx:
 * import ErrorBoundaryTest from './components/ErrorBoundaryTest';
 * <ErrorBoundaryTest />
 */
export default function ErrorBoundaryTest(): JSX.Element {
  const [shouldError, setShouldError] = useState<boolean>(false);

  if (shouldError) {
    // This will trigger the error boundary
    throw new Error('Test error: ErrorBoundary is working! Click "Try Again" to recover.');
  }

  return (
    <div className="fixed bottom-20 left-6 z-50">
      <button
        onClick={() => setShouldError(true)}
        className="text-error-400 hover:text-error-300 rounded-lg border border-error-500 bg-error-500/20 px-4 py-2 font-mono text-sm transition-all duration-300 hover:bg-error-500/30"
        title="Click to test ErrorBoundary"
      >
        Test Error Boundary
      </button>
    </div>
  );
}
