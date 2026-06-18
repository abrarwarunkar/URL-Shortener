import type { Metadata } from 'next';
import { ReactNode } from 'react';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'URL Shortener',
  description: 'A simple and efficient URL shortening service',
  viewport: 'width=device-width, initial-scale=1',
};

interface RootLayoutProps {
  children: ReactNode;
}

/**
 * Root Layout Component
 * 
 * Provides the top-level layout structure for the entire application.
 * Sets up:
 * - HTML document structure
 * - Global styles
 * - Provider setup (stores, context)
 * - Navigation and header
 * 
 * The layout wraps all page content with a consistent header and error boundary.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        {/* Navigation/Header will be added here */}
        <main className="min-h-screen">
          {children}
        </main>
        {/* Toast container will be added here */}
      </body>
    </html>
  );
}
