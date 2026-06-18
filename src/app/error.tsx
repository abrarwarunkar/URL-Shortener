'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global Error Boundary Component
 * 
 * Catches and displays errors that occur during rendering or data fetching.
 * Provides:
 * - User-friendly error message
 * - Error details for debugging (in development)
 * - Reset button to try again
 * 
 * This is a Next.js error boundary that wraps all page content.
 * Errors in child pages/components bubble up to this component.
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Something went wrong
        </h1>

        <p className="text-gray-600 mb-6">
          An unexpected error occurred. Please try again or contact support if the problem persists.
        </p>

        {process.env.NODE_ENV === 'development' && error.message && (
          <details className="mb-6 p-4 bg-gray-100 rounded text-left text-sm">
            <summary className="cursor-pointer font-mono text-gray-700">
              Error details (development only)
            </summary>
            <pre className="mt-2 text-xs overflow-auto text-red-600">
              {error.message}
              {error.digest && `\n\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}

        <button
          onClick={() => reset()}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          Try again
        </button>

        <a
          href="/"
          className="block mt-4 text-blue-600 hover:text-blue-700 underline"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}
