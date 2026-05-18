'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { L } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-sidebar text-sidebar-foreground p-4 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-sidebar-foreground/80">
          {L({
            en: 'We use cookies to enhance your experience. By continuing to browse our site, you agree to our use of cookies.',
            fr: 'Nous utilisons des cookies pour améliorer votre expérience. En continuant à naviguer sur notre site, vous acceptez notre utilisation des cookies.',
          })}
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Button asChild variant="link" size="sm" className="text-sidebar-foreground/70 hover:text-sidebar-foreground">
            <Link href="/cookies">
              {L({ en: 'Learn More', fr: 'En Savoir Plus' })}
            </Link>
          </Button>
          <Button size="sm" onClick={accept}>
            {L({ en: 'Accept All', fr: 'Tout Accepter' })}
          </Button>
        </div>
      </div>
    </div>
  );
}
