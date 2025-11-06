import React from 'react';
import type {Metadata} from 'next';
import './globals.css';
import '@/public/svg/parallax-story/tokens.css';
import {Analytics} from '@/components/Analytics';

export const metadata: Metadata = {
  title: 'Shy App - Meet people nearby. Keep the connections that matter.',
  description:
    'Connect with real people at verified Shy Locations. Send chat requests, build lasting relationships.',
  metadataBase: new URL('https://web-oisjx0yop-shy-app.vercel.app'),
  openGraph: {
    title: 'Shy App - Meet people nearby. Keep the connections that matter.',
    description:
      'Connect with real people at verified Shy Locations. Send chat requests, build lasting relationships.',
    url: 'https://web-oisjx0yop-shy-app.vercel.app',
    siteName: 'Shy App',
    images: [
      {
        url: '/og-shy.jpg',
        width: 1200,
        height: 630,
        alt: 'Shy App - Connect with people nearby',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shy App - Meet people nearby. Keep the connections that matter.',
    description:
      'Connect with real people at verified Shy Locations. Send chat requests, build lasting relationships.',
    images: ['/og-shy.jpg'],
  },
  icons: {
    icon: '/shyLogo.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover', // Safe area support for notched devices
  },
  themeColor: '#0B0E13',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        {/* Roboto to match mobile app */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <div className="page-wrap">
          {/* fixed background layers */}
          <div className="backdrop" />
          <div className="backdrop-pulse" />

          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
