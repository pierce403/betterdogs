import './globals.css';
import type { Metadata } from 'next';
import AuthProvider from '@/components/AuthProvider';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://betterdogs.ai'),
  title: 'BetterDogs',
  description: 'Track dog training cases, progress, and outcomes in one clean dashboard.',
  openGraph: {
    title: 'BetterDogs',
    description: 'Track dog training cases, progress, and outcomes in one clean dashboard.',
    url: 'https://betterdogs.ai',
    siteName: 'BetterDogs',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'BetterDogs dashboard preview card'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BetterDogs',
    description: 'Track dog training cases, progress, and outcomes in one clean dashboard.',
    images: ['/opengraph-image']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <nav className='p-4 bg-white border-b flex gap-4'>
            <Link href='/'>BetterDogs</Link>
            <Link href='/dashboard'>Dashboard</Link>
            <Link href='/pricing'>Pricing</Link>
            <Link href='/about'>About</Link>
          </nav>
          <main className='max-w-5xl mx-auto p-4'>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
