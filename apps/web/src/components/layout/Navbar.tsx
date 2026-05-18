'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const navLinks = [
  { href: '/about', en: 'About Us', fr: 'À Propos' },
  { href: '/services', en: 'Services', fr: 'Services' },
  { href: '/products', en: 'Products', fr: 'Produits' },
  { href: '/tracking', en: 'Tracking', fr: 'Suivi' },
  { href: '/news', en: 'News', fr: 'Actualités' },
  { href: '/contact', en: 'Contact', fr: 'Contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, L } = useLanguage();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">LT</span>
          </div>
          <span className="font-bold text-lg">
            LTIC <span className="text-primary">SARL</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive(link.href)
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {L(link)}
            </Link>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-md border text-sm font-medium hover:bg-muted transition-colors"
          >
            <Globe className="h-4 w-4" />
            {language.toUpperCase()}
          </button>
          <Button asChild size="sm">
            <Link href="/quote">
              {L({ en: 'Request Quote', fr: 'Demander un Devis' })}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-background border-b shadow-lg z-50 p-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'px-4 py-3 rounded-md text-sm font-medium transition-colors',
                isActive(link.href)
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {L(link)}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t mt-1">
            <button
              onClick={() => { setLanguage(language === 'en' ? 'fr' : 'en'); setMobileOpen(false); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md border text-sm font-medium hover:bg-muted transition-colors"
            >
              <Globe className="h-4 w-4" />
              {language.toUpperCase()}
            </button>
            <Button asChild size="sm" className="flex-1">
              <Link href="/quote" onClick={() => setMobileOpen(false)}>
                {L({ en: 'Request Quote', fr: 'Demander un Devis' })}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
