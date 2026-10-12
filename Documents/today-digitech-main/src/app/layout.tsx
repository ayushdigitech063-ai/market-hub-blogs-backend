import './globals.css';
import React from 'react';
import { StructuredData } from '../components/seo/StructuredData';
import { organizationSchema } from '../lib/seo';

export const metadata = {
  title: 'Today Digitech - Next-Gen Digital Solutions',
  description: 'Enterprise Digital Transformation, Software Engineering & Tech Innovation',
  metadataBase: new URL('https://todaydigitech.com'),
  openGraph: {
    type: 'website',
    siteName: 'Today Digitech',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@todaydigitech',
  },
};

import { AnalyticsScripts } from '../components/analytics/AnalyticsScripts';
import { Preloader } from '../components/layout/Preloader';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <AnalyticsScripts />
        <StructuredData data={organizationSchema} />
        {children}
      </body>
    </html>
  );
}
