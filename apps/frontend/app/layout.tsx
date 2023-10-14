'use client';

import { ThemeProvider } from './components/theme-provider';
import './global.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@agentsflow/ui-components';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: "Agentsflow",
//   description: "Create and connect AI agents",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
