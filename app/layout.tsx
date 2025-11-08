import React from 'react';
import type {Metadata, Viewport} from 'next';
import './globals.css';
import '@/public/svg/parallax-story/tokens.css';
import {Analytics} from '@/components/Analytics';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#0B0E13',
};

export const metadata: Metadata = {
  title: 'Shy App - Meet People Nearby at Verified Locations | Real Connections',
  description:
    'Connect with real people at verified Shy Locations near you. 1 token per chat request, permanent connections. No phone numbers, no bots, just authentic relationships. Available on iOS & Android.',
  metadataBase: new URL('https://web-oisjx0yop-shy-app.vercel.app'),
  keywords: [
    'shy app',
    'meet people nearby',
    'local connections',
    'real life dating',
    'verified locations',
    'proximity chat',
    'in-person meetup',
    'token system',
    'safe dating app',
    'authentic connections',
    'location-based social',
  ],
  authors: [{name: 'Shy Inc.'}],
  creator: 'Shy Inc.',
  publisher: 'Shy Inc.',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Shy App - Meet People Nearby at Verified Locations',
    description:
      'Connect with real people at verified Shy Locations. 1 token to start a chat, permanent connections once accepted. Available in 23+ cities across the US.',
    url: 'https://web-oisjx0yop-shy-app.vercel.app',
    siteName: 'Shy App',
    images: [
      {
        url: '/og-shy.jpg',
        width: 1200,
        height: 630,
        alt: 'Shy App - Connect with people nearby at verified locations',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@shyapp',
    creator: '@shyapp',
    title: 'Shy App - Meet People Nearby at Verified Locations',
    description:
      'Connect with real people at verified Shy Locations. 1 token per chat request, permanent connections. No bots, just authentic relationships.',
    images: ['/og-shy.jpg'],
  },
  icons: {
    icon: '/shyLogo.png',
    apple: '/shyLogo.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Shy App',
  },
  applicationName: 'Shy App',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Shy App',
    applicationCategory: 'SocialNetworkingApplication',
    operatingSystem: 'iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '1200',
    },
    description:
      'Connect with real people at verified Shy Locations near you. 1 token per chat request, permanent connections once accepted.',
    downloadUrl: 'https://apps.apple.com/us/app/shy/id6444877711',
    screenshot: '/images/hero-bg.jpg',
    author: {
      '@type': 'Organization',
      name: 'Shy Inc.',
      url: 'https://web-oisjx0yop-shy-app.vercel.app',
    },
    provider: {
      '@type': 'Organization',
      name: 'Shy Inc.',
      sameAs: [
        'https://www.tiktok.com/@shyapp',
        'https://www.instagram.com/shyapp',
        'https://www.facebook.com/shyapp',
        'https://www.linkedin.com/company/shyapp',
      ],
    },
  };

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
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
