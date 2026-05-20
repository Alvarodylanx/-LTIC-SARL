import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--app-font-sans' });

export const metadata: Metadata = {
  title: 'LTIC SARL — Global Logistics & Industrial Solutions',
  description: 'LTIC SARL is a multinational business solutions provider specializing in logistics, international trade, industrial supply, and supply chain consulting across 30+ countries.',
  openGraph: {
    title: 'LTIC SARL — Global Logistics & Industrial Solutions',
    description: 'Multinational logistics, industrial supply, and international trade excellence.',
    type: 'website',
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
