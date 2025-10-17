import { ReactNode } from 'react';
import { Loader2, AlertTriangle, Inbox } from 'lucide-react';

interface DataFetchWrapperProps {
  /** Loading state - shows loading spinner when true */
  isLoading: boolean;
  /** Error state - shows error message if truthy (can be string, Error, or boolean) */
  error?: string | Error | null;
  /** Empty state - shows empty message when true and not loading/error */
  isEmpty?: boolean;
  /** Children to render when data is successfully loaded */
  children: ReactNode;
  /** Optional className for the wrapper div */
  className?: string;
  /** Optional custom loading message */
  loadingMessage?: string;
  /** Optional custom empty message */
  emptyMessage?: string;
}

/**
 * DataFetchWrapper - Handles common data fetching states
 *
 * Renders different UI based on loading, error, and empty states.
 * Only renders children when data is successfully loaded.
 *
 * @example
 * ```tsx
 * <DataFetchWrapper isLoading={isLoading} error={error} isEmpty={!data?.length}>
 *   <YourComponent data={data} />
 * </DataFetchWrapper>
 * ```
 */
export default function DataFetchWrapper({
  isLoading,
  error,
  isEmpty = false,
  children,
  className = '',
  loadingMessage = 'Loading...',
  emptyMessage = 'No data available',
}: DataFetchWrapperProps): JSX.Element {
  const wrapperClasses = `w-full ${className}`;

  // Loading state
  if (isLoading) {
    return (
      <div className={wrapperClasses}>
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : 'An error occurred';

    return (
      <div className={wrapperClasses}>
        <div className="rounded-lg border border-destructive bg-destructive/10 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 flex-shrink-0 text-destructive" aria-hidden="true" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-destructive-foreground">Error</h3>
              <p className="mt-1 text-sm text-destructive-foreground">{errorMessage}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (isEmpty) {
    return (
      <div className={wrapperClasses}>
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted py-12">
          <Inbox
            className="mb-4 h-12 w-12 text-muted-foreground"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  // Success state - render children
  return <div className={wrapperClasses}>{children}</div>;
}
