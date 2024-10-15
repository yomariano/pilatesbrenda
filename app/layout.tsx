import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import AuthButton from '@/components/auth-button';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pilates Studio',
  description: 'Join our Pilates classes for all levels',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="bg-purple-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">PilatesPro</h1>
              <nav className="hidden md:flex space-x-4">
                <a href="#" className="hover:underline">
                  Home
                </a>
                <a href="#" className="hover:underline">
                  Classes
                </a>
                <a href="#" className="hover:underline">
                  Pricing
                </a>
                <a href="#" className="hover:underline">
                  Contact
                </a>
                <a>
                  <AuthButton />
                </a>
              </nav>
            </div>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
