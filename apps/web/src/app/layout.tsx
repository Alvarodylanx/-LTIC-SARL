import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--app-font-sans' });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lticsarl.com';

export const metadata: Metadata = {
  title: 'LTIC SARL — Global Logistics & Industrial Solutions',
  description: 'LTIC SARL is a multinational business solutions provider specializing in logistics, international trade, industrial supply, and supply chain consulting across 30+ countries.',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'LTIC SARL — Global Logistics & Industrial Solutions',
    description: 'Multinational logistics, industrial supply, and international trade excellence.',
    type: 'website',
    url: SITE_URL,
    siteName: 'LTIC SARL',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'LTIC SARL — Global Logistics' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LTIC SARL — Global Logistics & Industrial Solutions',
    description: 'Multinational logistics, industrial supply, and international trade excellence.',
    images: ['/og-image.png'],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LTIC SARL',
  url: 'https://www.lticsarl.com',
  logo: 'https://www.lticsarl.com/logo.png',
  description: 'Multinational business solutions provider specializing in logistics, international trade, industrial supply, and supply chain consulting across 30+ countries.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Douala',
    addressCountry: 'CM',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'contact@lticsarl.com',
    availableLanguage: ['English', 'French'],
  },
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={inter.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
