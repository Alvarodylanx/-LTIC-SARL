'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Package, Tag, FileText, Truck, Newspaper,
  MessageSquare, Settings, LogOut, ShieldAlert, UserCircle,
  GitBranch, Globe, Bell, X,
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

export function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [unread, setUnread] = useState(0);
  const { language, setLanguage, L } = useLanguage();

  useEffect(() => {
    checkAuth().then((res) => {
      if (!res.authenticated) router.push('/auth/login?redirect=/admin/dashboard');
      else setUsername(res.username || 'Admin');
    });
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    fetch(`${API_URL}/api/admin/profile`, { credentials: 'include' })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.avatarUrl) setAvatarUrl(data.avatarUrl); })
      .catch(() => {});
  }, [router]);

  useEffect(() => {
    const fetchCount = () =>
      api.get('/api/notifications/unread-count')
        .then((d: any) => setUnread(d.count ?? 0))
        .catch(() => {});

    fetchCount();

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const es = new EventSource(`${API_URL}/api/notifications/stream`, { withCredentials: true });
    es.onmessage = () => { setUnread((n) => n + 1); };
    es.onerror = () => { es.close(); };

    const fallback = setInterval(fetchCount, 60_000);
    return () => {
      es.close();
      clearInterval(fallback);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  return (
    <div className="w-64 min-h-screen h-full bg-sidebar text-sidebar-foreground flex flex-col overflow-y-auto">

      {/* Brand row */}
      <div className="px-5 pt-5 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-primary" />
          <span className="font-bold tracking-wide">LTIC SARL</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-sidebar-accent/50 transition-colors">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Profile card */}
      {username && (
        <div className="mx-3 mb-2 rounded-xl bg-sidebar-accent/30 border border-sidebar-border p-4 flex flex-col items-center gap-2">
          {avatarUrl ? (
            <img
              src={`${API_URL}${avatarUrl}`}
              alt={username}
              className="h-14 w-14 rounded-full object-cover border-2 border-primary/40 shadow"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-primary/20 border-2 border-primary/40 shadow flex items-center justify-center">
              <span className="text-xl font-bold text-primary">{username.charAt(0).toUpperCase()}</span>
            </div>
          )}
          <div className="text-center min-w-0 w-full">
            <p className="text-sm font-semibold text-sidebar-foreground truncate">{username}</p>
            <p className="text-[11px] text-sidebar-foreground/50 mt-0.5">{L({ en: 'Administrator', fr: 'Administrateur' })}</p>
          </div>
        </div>
      )}

      <div className="mx-3 mb-3 border-b border-sidebar-border" />

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
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
          onClick={onClose}
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
