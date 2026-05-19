'use client';

export type CookieCategory = 'essential' | 'functional' | 'analytics' | 'marketing';

export interface CookieConsent {
  version: string;
  timestamp: string;
  decided: boolean;
  categories: Record<CookieCategory, boolean>;
}

export const COOKIE_CATEGORIES: {
  id: CookieCategory;
  nameEn: string;
  nameFr: string;
  descEn: string;
  descFr: string;
  required: boolean;
  cookies: { name: string; purpose: string; duration: string }[];
}[] = [
  {
    id: 'essential',
    nameEn: 'Essential',
    nameFr: 'Essentiels',
    descEn: 'These cookies are required for the website to function and cannot be disabled. They include session management and security features.',
    descFr: 'Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés. Ils incluent la gestion des sessions et les fonctionnalités de sécurité.',
    required: true,
    cookies: [
      { name: 'customer_token', purpose: 'Customer authentication session', duration: '7 days' },
      { name: 'admin_token', purpose: 'Admin authentication session', duration: '24 hours' },
    ],
  },
  {
    id: 'functional',
    nameEn: 'Functional',
    nameFr: 'Fonctionnels',
    descEn: 'These cookies remember your preferences such as language and display settings to provide a personalised experience.',
    descFr: 'Ces cookies mémorisent vos préférences telles que la langue et les paramètres d\'affichage pour offrir une expérience personnalisée.',
    required: false,
    cookies: [
      { name: 'language', purpose: 'Stores your language preference (EN/FR)', duration: 'Persistent' },
      { name: 'cookieConsent', purpose: 'Remembers your cookie preferences', duration: '1 year' },
    ],
  },
  {
    id: 'analytics',
    nameEn: 'Analytics',
    nameFr: 'Analytiques',
    descEn: 'These cookies help us understand how visitors interact with our website, allowing us to improve performance and content.',
    descFr: 'Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site, nous permettant d\'améliorer les performances et le contenu.',
    required: false,
    cookies: [
      { name: '_ltic_session', purpose: 'Anonymous session tracking for analytics', duration: 'Session' },
      { name: '_ltic_pageview', purpose: 'Page view and navigation analytics', duration: '30 days' },
    ],
  },
  {
    id: 'marketing',
    nameEn: 'Marketing',
    nameFr: 'Marketing',
    descEn: 'These cookies are used to track visitors across websites to display relevant advertisements. We currently do not use third-party advertising.',
    descFr: 'Ces cookies sont utilisés pour suivre les visiteurs sur les sites web afin d\'afficher des publicités pertinentes. Nous n\'utilisons pas actuellement de publicité tierce.',
    required: false,
    cookies: [
      { name: '_ltic_utm', purpose: 'Campaign and referral source tracking', duration: '90 days' },
    ],
  },
];

const STORAGE_KEY = 'ltic_cookie_consent';
const CONSENT_VERSION = '1.1';

export function getConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsent;
  } catch {
    return null;
  }
}

export function hasDecided(): boolean {
  const c = getConsent();
  return c?.decided === true && c.version === CONSENT_VERSION;
}

export function isAllowed(category: CookieCategory): boolean {
  if (category === 'essential') return true;
  const c = getConsent();
  return c?.categories[category] === true;
}

export function saveConsent(categories: Record<CookieCategory, boolean>): void {
  const consent: CookieConsent = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    decided: true,
    categories: { ...categories, essential: true },
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));

  // Apply consent side effects
  if (!categories.functional) {
    localStorage.removeItem('language');
  }
  if (!categories.analytics) {
    localStorage.removeItem('_ltic_session');
    localStorage.removeItem('_ltic_pageview');
  }
}

export function acceptAll(): void {
  saveConsent({ essential: true, functional: true, analytics: true, marketing: true });
}

export function rejectAll(): void {
  saveConsent({ essential: true, functional: false, analytics: false, marketing: false });
}

export function withdrawConsent(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getConsentSummary(): string {
  const c = getConsent();
  if (!c) return 'Not decided';
  const active = COOKIE_CATEGORIES.filter((cat) => c.categories[cat.id]).map((cat) => cat.nameEn);
  return active.join(', ');
}
