import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Patani26Bot from '@/components/site/Patani26Bot';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://beraspatani26.id'),

  title: {
    default:
      'BerasPatani26 — Gabah, Beras & Distribusi Hasil Panen',
    template: '%s | BerasPatani26',
  },

  description:
    'BerasPatani26 adalah bisnis pertanian yang menyalurkan gabah dan beras berkualitas dari petani Patani ke seluruh Nusantara.',

  keywords: [
    'BerasPatani26',
    'beras',
    'gabah',
    'beras premium',
    'beras berkualitas',
    'hasil panen',
    'pertanian',
    'petani',
    'distributor beras',
    'supplier beras',
  ],

  authors: [
    {
      name: 'BerasPatani26',
    },
  ],

  creator: 'BerasPatani26',
  publisher: 'BerasPatani26',

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: 'BerasPatani26',
    description:
      'Gabah, beras, dan hasil pertanian berkualitas langsung dari petani.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'BerasPatani26',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${jakarta.variable} min-h-screen bg-white text-stone-900 antialiased`}
      >
        {children}

        <Patani26Bot />
      </body>
    </html>
  );
}