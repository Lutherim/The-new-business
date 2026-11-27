import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { VERIFIED_PROPERTY } from '@/lib/property-data';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const appUrl = process.env.APP_URL || 'https://limpopoguestmanor.example.com';

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: 'Limpopo Guest Manor | Boutique Stay & Conferencing in Polokwane',
  description:
    'Comfortable guest accommodation and 100-seat corporate conferencing at 82 Plein Street / 48 Devenish Street, Polokwane CBD, Limpopo. Request your stay or venue booking directly.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Limpopo Guest Manor',
    title: 'Limpopo Guest Manor | Boutique Stay & Conferencing in Polokwane',
    description:
      'Comfortable guest accommodation and 100-seat corporate conferencing in the heart of Polokwane CBD, Limpopo, South Africa.',
    url: appUrl,
    images: [
      {
        url: '/images/hero_manor_exterior_1795795972159.jpg',
        width: 1600,
        height: 900,
        alt: 'Limpopo Guest Manor Concept Preview — Polokwane CBD',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Limpopo Guest Manor | Boutique Stay & Conferencing in Polokwane',
    description:
      'Comfortable guest accommodation and 100-seat corporate conferencing in the heart of Polokwane CBD, Limpopo, South Africa.',
    images: ['/images/hero_manor_exterior_1795795972159.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: VERIFIED_PROPERTY.name,
    description:
      'Guest accommodation and 100-seat corporate conferencing venue located in Polokwane CBD, Limpopo, South Africa. Unofficial concept preview.',
    url: appUrl,
    telephone: VERIFIED_PROPERTY.contact.mobileDisplay,
    email: VERIFIED_PROPERTY.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${VERIFIED_PROPERTY.address.streetPrimary} / ${VERIFIED_PROPERTY.address.streetSecondary}, ${VERIFIED_PROPERTY.address.district}`,
      addressLocality: VERIFIED_PROPERTY.address.city,
      addressRegion: VERIFIED_PROPERTY.address.province,
      addressCountry: 'ZA',
    },
    maximumAttendeeCapacity: VERIFIED_PROPERTY.conferencing.reportedCapacitySeats,
  };

  return (
    <html
      lang="en-ZA"
      className={`scroll-smooth ${cormorant.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${plusJakarta.className} bg-[#FAF8F4] text-[#1C211E] antialiased selection:bg-[#162B1F] selection:text-[#FAF8F4]`}
      >
        {children}
      </body>
    </html>
  );
}
