import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Github Repositories Explorer',
  description: 'Created by Ore Akintobi',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
