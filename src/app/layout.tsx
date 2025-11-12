import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import { Inter, Nunito } from 'next/font/google';
import Script from 'next/script';

import '../styles/index.css';

// Font configurations
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nunito',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="beforeInteractive"
        />
      </head>
      <body id="root" className={`${inter.variable} ${nunito.variable} scroll-smooth `}>
        <AppWrappers>{children}</AppWrappers>
      </body>
    </html>
  );
}