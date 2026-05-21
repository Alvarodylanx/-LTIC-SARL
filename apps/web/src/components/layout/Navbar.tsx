'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, L } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'sticky top-0 z-50 border-b h-16 flex items-center transition-all duration-300',
        scrolled ? 'bg-background/98 backdrop-blur-md shadow-sm' : 'bg-background/95 backdrop-blur-sm',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm"
          >
            <span className="text-white font-bold text-sm">LT</span>
          </motion.div>
          <span className="font-bold text-lg">
            LTIC <span className="text-primary">SARL</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive(link.href)
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted',
              )}
            >
              {L(link)}
              {isActive(link.href) && (
                <motion.span layoutId="nav-active" className="absolute inset-0 rounded-md bg-primary/10 -z-10" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-md border text-sm font-medium hover:bg-muted transition-colors"
          >
            <Globe className="h-4 w-4" />
            {language.toUpperCase()}
          </motion.button>
          {pathname !== '/' && (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="sm">
                <Link href="/quote">{L({ en: 'Request Quote', fr: 'Demander un Devis' })}</Link>
              </Button>
            </motion.div>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="lg:hidden">
          <button
            className="p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={mobileOpen ? 'x' : 'menu'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden absolute top-16 left-0 right-0 bg-background border-b shadow-xl z-50 overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive(link.href) ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                  )}
                >
                  {L(link)}
                </Link>
              ))}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t mt-2">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md border text-sm font-medium hover:bg-muted transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  {language.toUpperCase()}
                </button>
                {pathname !== '/' && (
                  <Button asChild size="sm">
                    <Link href="/quote">{L({ en: 'Request Quote', fr: 'Demander un Devis' })}</Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
