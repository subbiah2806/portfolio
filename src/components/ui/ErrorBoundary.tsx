import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}

/**
 * ErrorBoundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the whole app.
 *
 * @see https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error details to console (can be extended to send to error tracking service)
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo: errorInfo.componentStack || null,
    });

    // TODO: Send error to error tracking service (e.g., Sentry, LogRocket)
    // Example: errorTrackingService.logError(error, errorInfo);
  }

  handleReset = (): void => {
    // Reset error state to allow retry
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800 px-4">
          <div className="w-full max-w-2xl rounded-xl border border-neutral-700/50 bg-neutral-800/50 p-8 backdrop-blur-sm">
            {/* Error Icon */}
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-error-500/20 p-4">
                <svg
                  className="h-12 w-12 text-error-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="mb-4 text-center text-3xl font-bold text-neutral-100">
              Something went wrong
            </h1>

            <p className="mb-6 text-center text-lg text-neutral-400">
              We&rsquo;re sorry for the inconvenience. An unexpected error has occurred.
            </p>

            {/* Error Details (only in development) */}
            {import.meta.env.DEV && this.state.error && (
              <div className="mb-6 rounded-lg border border-neutral-700 bg-neutral-900/50 p-4">
                <p className="text-error-400 mb-2 font-mono text-sm font-semibold">
                  Error Details:
                </p>
                <p className="mb-3 font-mono text-sm text-neutral-300">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="cursor-pointer">
                    <summary className="mb-2 font-mono text-xs text-neutral-500 hover:text-neutral-400">
                      Component Stack Trace
                    </summary>
                    <pre className="overflow-x-auto font-mono text-xs text-neutral-500">
                      {this.state.errorInfo}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={this.handleReset}
                className="rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-primary-700"
              >
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="rounded-lg border border-neutral-700 bg-neutral-800/50 px-6 py-3 font-semibold text-neutral-200 backdrop-blur-sm transition-all duration-300 hover:bg-neutral-700/50"
              >
                Go to Home
              </button>
            </div>

            {/* Support Information */}
            <p className="mt-8 text-center font-mono text-xs text-neutral-500">
              If the problem persists, please contact support or refresh the page.
            </p>
          </div>
        </div>
      );
    }
    console.log('children');

    return this.props.children;
  }
}

export default ErrorBoundary;
