'use client';
import React from 'react';
import Script from 'next/script';

/**
 * gtag loader for GA4 + Google Ads. Controlled via env vars:
 * - NEXT_PUBLIC_GA_ID (e.g., G-5VTMWFK3L3)
 * - NEXT_PUBLIC_AW_ID (e.g., AW-11171081328)
 * - NEXT_PUBLIC_ADS_IOS_LABEL (optional)
 * - NEXT_PUBLIC_ADS_ANDROID_LABEL (optional)
 */
export function Analytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const AW_ID = process.env.NEXT_PUBLIC_AW_ID;
  const hasAny = GA_ID || AW_ID;
  return (
    <>
      {GA_ID && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
      )}
      {hasAny && (
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            ${GA_ID ? `gtag('config', '${GA_ID}');` : ''}
            ${AW_ID ? `gtag('config', '${AW_ID}');` : ''}
            window.SHY_ADS_IOS_LABEL = '${
              process.env.NEXT_PUBLIC_ADS_IOS_LABEL || ''
            }';
            window.SHY_ADS_ANDROID_LABEL = '${
              process.env.NEXT_PUBLIC_ADS_ANDROID_LABEL || ''
            }';
          `}
        </Script>
      )}
    </>
  );
}
