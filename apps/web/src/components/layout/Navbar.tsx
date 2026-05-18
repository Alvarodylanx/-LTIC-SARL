'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { NotificationBell } from '@/components/auth/NotificationBell';

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
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, L } = useLanguage();
  const { user, logout, openAuth } = useUser();

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
                'relative px-3 py-2 rounded-md text-sm font-medium transition-colors group',
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

          {user ? (
            <>
              <NotificationBell />
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setUserMenuOpen(v => !v)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium hover:bg-muted transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                    {user.name[0].toUpperCase()}
                  </div>
                  <span className="max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </motion.button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -6 }}
                      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-0 top-11 w-48 bg-background border rounded-xl shadow-xl z-50 overflow-hidden py-1"
                      onMouseLeave={() => setUserMenuOpen(false)}
                    >
                      <div className="px-3 py-2 border-b">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <button onClick={() => { logout(); setUserMenuOpen(false); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                        <LogOut className="h-4 w-4" />
                        {L({ en: 'Sign out', fr: 'Se déconnecter' })}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => openAuth('login')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md border text-sm font-medium hover:bg-muted transition-colors"
            >
              <User className="h-4 w-4" />
              {L({ en: 'Sign In', fr: 'Connexion' })}
            </motion.button>
          )}

        </div>

        {/* Mobile hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          {user && <NotificationBell />}
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
              <div className="flex items-center gap-2 pt-3 border-t mt-2">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md border text-sm font-medium hover:bg-muted transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  {language.toUpperCase()}
                </button>
                {user ? (
                  <button onClick={logout} className="flex items-center gap-1.5 px-3 py-2 rounded-md border text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
                    <LogOut className="h-4 w-4" />
                    {L({ en: 'Sign out', fr: 'Déconnexion' })}
                  </button>
                ) : (
                  <button onClick={() => openAuth('login')} className="flex items-center gap-1.5 px-3 py-2 rounded-md border text-sm font-medium hover:bg-muted transition-colors">
                    <User className="h-4 w-4" />
                    {L({ en: 'Sign In', fr: 'Connexion' })}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
