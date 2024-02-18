import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider, useMessages } from 'next-intl';
// import 'node_modules/flag-icons/css/flag-icons.min.css';

const manrope = Manrope({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Github Repositories Explorer',
  description: 'Created by Ore Akintobi',
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={manrope.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
