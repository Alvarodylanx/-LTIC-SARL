'use client';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CookiesPage() {
  const { L } = useLanguage();
  return (
    <>
      <section className="bg-sidebar py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-sidebar-foreground">{L({ en: 'Cookie Policy', fr: 'Politique de Cookies' })}</h1>
          <p className="text-sidebar-foreground/70 mt-2 text-sm">{L({ en: 'Last updated: May 2026', fr: 'Dernière mise à jour: Mai 2026' })}</p>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 prose prose-slate">
          <h2>{L({ en: '1. What Are Cookies', fr: '1. Que sont les Cookies' })}</h2>
          <p>{L({ en: 'Cookies are small text files placed on your device when you visit a website. They help websites function correctly and provide information about how the site is used.', fr: 'Les cookies sont de petits fichiers texte placés sur votre appareil lorsque vous visitez un site web. Ils aident les sites web à fonctionner correctement et fournissent des informations sur la façon dont le site est utilisé.' })}</p>
          <h2>{L({ en: '2. How We Use Cookies', fr: '2. Comment Nous Utilisons les Cookies' })}</h2>
          <p>{L({ en: 'We use cookies to remember your language preference, maintain your session, analyze website traffic, and improve your browsing experience. We do not use cookies for advertising purposes.', fr: 'Nous utilisons des cookies pour mémoriser votre préférence linguistique, maintenir votre session, analyser le trafic du site web et améliorer votre expérience de navigation.' })}</p>
          <h2>{L({ en: '3. Types of Cookies We Use', fr: '3. Types de Cookies que Nous Utilisons' })}</h2>
          <ul>
            <li><strong>{L({ en: 'Essential Cookies:', fr: 'Cookies Essentiels:' })}</strong> {L({ en: 'Required for the website to function. Cannot be disabled.', fr: 'Requis pour le fonctionnement du site web. Ne peuvent pas être désactivés.' })}</li>
            <li><strong>{L({ en: 'Preference Cookies:', fr: 'Cookies de Préférence:' })}</strong> {L({ en: 'Remember your language and display preferences.', fr: 'Mémorisent votre langue et vos préférences d\'affichage.' })}</li>
            <li><strong>{L({ en: 'Analytics Cookies:', fr: 'Cookies Analytiques:' })}</strong> {L({ en: 'Help us understand how visitors interact with our website.', fr: 'Nous aident à comprendre comment les visiteurs interagissent avec notre site web.' })}</li>
          </ul>
          <h2>{L({ en: '4. Managing Cookies', fr: '4. Gestion des Cookies' })}</h2>
          <p>{L({ en: 'You can control and delete cookies through your browser settings. Note that disabling cookies may affect the functionality of this website. Most browsers allow you to refuse cookies or delete existing ones.', fr: 'Vous pouvez contrôler et supprimer les cookies via les paramètres de votre navigateur. Notez que la désactivation des cookies peut affecter la fonctionnalité de ce site web.' })}</p>
        </div>
      </section>
    </>
  );
}
