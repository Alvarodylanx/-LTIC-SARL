'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Package, Tag, FileText, Truck, Newspaper,
  MessageSquare, Settings, LogOut, ShieldAlert, UserCircle,
  GitBranch, Globe, Bell,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { checkAuth, logout } from '@/lib/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/api';

const NAV = [
  { href: '/admin/dashboard',     icon: LayoutDashboard, label: { en: 'Dashboard',  fr: 'Tableau de bord' } },
  { href: '/admin/products',      icon: Package,         label: { en: 'Products',   fr: 'Produits' } },
  { href: '/admin/categories',    icon: Tag,             label: { en: 'Categories', fr: 'Catégories' } },
  { href: '/admin/quotes',        icon: FileText,        label: { en: 'Quotes',     fr: 'Devis' } },
  { href: '/admin/orders',        icon: Truck,           label: { en: 'Orders',     fr: 'Commandes' } },
  { href: '/admin/news',          icon: Newspaper,       label: { en: 'News',       fr: 'Actualités' } },
  { href: '/admin/contacts',      icon: MessageSquare,   label: { en: 'Contacts',   fr: 'Contacts' } },
  { href: '/admin/settings',      icon: Settings,        label: { en: 'Settings',   fr: 'Paramètres' } },
  { href: '/admin/changelog',     icon: GitBranch,       label: { en: 'Changelog',  fr: 'Historique' } },
  { href: '/admin/profile',       icon: UserCircle,      label: { en: 'My Profile', fr: 'Mon profil' } },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [unread, setUnread] = useState(0);
  const { language, setLanguage, L } = useLanguage();

  useEffect(() => {
    checkAuth().then((res) => {
      if (!res.authenticated) router.push('/auth/login?redirect=/admin/dashboard');
      else setUsername(res.username || 'Admin');
    });
  }, [router]);

  useEffect(() => {
    const fetchCount = () =>
      api.get('/api/notifications/unread-count')
        .then((d: any) => setUnread(d.count ?? 0))
        .catch(() => {});
    fetchCount();
    const id = setInterval(fetchCount, 30_000);
    return () => clearInterval(id);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/admin');
  };

  return (
    <div className="w-64 min-h-screen bg-sidebar text-sidebar-foreground flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-1">
          <ShieldAlert className="h-5 w-5 text-primary" />
          <span className="font-bold">LTIC SARL</span>
        </div>
        <p className="text-xs text-sidebar-foreground/60">{L({ en: 'Admin Panel', fr: 'Panneau admin' })}</p>
        {username && (
          <p className="text-xs text-sidebar-foreground/60 mt-1">
            {L({ en: 'Logged in as', fr: 'Connecté en tant que' })} <span className="text-sidebar-foreground">{username}</span>
          </p>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
              pathname === href || pathname.startsWith(href + '/')
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50',
            )}
          >
            <Icon className="h-4 w-4" />
            {L(label)}
          </Link>
        ))}

        {/* Notifications link with badge */}
        <Link
          href="/admin/notifications"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
            pathname === '/admin/notifications'
              ? 'bg-sidebar-accent text-sidebar-accent-foreground'
              : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50',
          )}
        >
          <Bell className="h-4 w-4" />
          <span className="flex-1">{L({ en: 'Notifications', fr: 'Notifications' })}</span>
          {unread > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
              {unread > 99 ? '99+' : unread}
            </span>
          )}
        </Link>
      </nav>

      <div className="p-4 border-t border-sidebar-border space-y-1">
        <button
          onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors w-full"
        >
          <Globe className="h-4 w-4" />
          <span>{language === 'en' ? 'English' : 'Français'}</span>
          <span className="ml-auto text-xs bg-sidebar-accent/60 px-1.5 py-0.5 rounded font-semibold">
            {language.toUpperCase()}
          </span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          {L({ en: 'Logout', fr: 'Déconnexion' })}
        </button>
      </div>
    </div>
  );
}
