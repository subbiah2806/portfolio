import { ReactNode } from 'react';
import { IconSpinner, IconAlertTriangle, IconInbox } from '../icons';

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
          <IconSpinner
            className="mb-4 animate-spin text-primary-600 dark:text-primary-400"
            style={{ fontSize: '48px' }}
          />
          <p className="text-neutral-600 dark:text-neutral-400">{loadingMessage}</p>
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
        <div className="rounded-lg border border-error-500 bg-error-500/10 p-6 dark:border-error-600 dark:bg-error-600/10">
          <div className="flex items-start gap-3">
            <IconAlertTriangle
              className="flex-shrink-0 text-error-600 dark:text-error-500"
              style={{ fontSize: '24px' }}
              aria-hidden="true"
            />
            <div className="flex-1">
              <h3 className="text-error-800 dark:text-error-300 text-sm font-semibold">Error</h3>
              <p className="text-error-700 dark:text-error-400 mt-1 text-sm">{errorMessage}</p>
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
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 py-12 dark:border-neutral-700 dark:bg-neutral-900">
          <IconInbox
            className="mb-4 text-neutral-400 dark:text-neutral-600"
            style={{ fontSize: '48px' }}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="text-neutral-600 dark:text-neutral-400">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  // Success state - render children
  return <div className={wrapperClasses}>{children}</div>;
}
