import type { Metadata } from 'next';
import './globals.css';
import { StudentProvider } from '@/lib/store';
import Navbar from '@/components/layout/Navbar';
import AuthModal from '@/components/interactive/AuthModal';
import AuthGuard from '@/components/layout/AuthGuard';

export const metadata: Metadata = {
  title: 'MLVERSE — Your Interactive Machine Learning University',
  description: 'Master Machine Learning from zero to practical projects. Interactive visualizers, Python coding labs, mathematical breakdowns, and hands-on algorithms.',
  keywords: ['Machine Learning', 'AI University', 'Deep Learning', 'Neural Networks', 'Python', 'Scikit-Learn', 'Interactive Education'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-black text-white antialiased selection:bg-white selection:text-black">
        <StudentProvider>
          <div className="flex min-h-screen flex-col bg-grid-pattern relative">
            <Navbar />
            <div className="flex-1 relative z-10">
              <AuthGuard>
                {children}
              </AuthGuard>
            </div>
            <AuthModal />
          </div>
        </StudentProvider>
      </body>
    </html>
  );
}
