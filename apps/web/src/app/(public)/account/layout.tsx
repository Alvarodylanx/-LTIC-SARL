'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Package, FileText, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { useCustomer } from '@/contexts/CustomerContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/account', icon: LayoutDashboard, en: 'Dashboard', fr: 'Tableau de bord', exact: true },
  { href: '/account/orders', icon: Package, en: 'My Orders', fr: 'Mes Commandes', exact: false },
  { href: '/account/quotes', icon: FileText, en: 'My Quotes', fr: 'Mes Devis', exact: false },
  { href: '/account/profile', icon: Settings, en: 'Profile', fr: 'Profil', exact: false },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { customer, loading, logout } = useCustomer();
  const { L } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !customer) router.push('/auth/login');
  }, [customer, loading, router]);

  if (loading || !customer) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-card border rounded-2xl p-4 sticky top-24">
            {/* User info */}
            <div className="flex items-center gap-3 p-3 mb-4 bg-muted/50 rounded-xl">
              {customer.avatarUrl ? (
                <img
                  src={`http://localhost:4000${customer.avatarUrl}`}
                  alt={customer.fullName}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">{customer.fullName[0]?.toUpperCase()}</span>
                </div>
              )}
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{customer.fullName}</p>
                <p className="text-xs text-muted-foreground truncate">{customer.email}</p>
              </div>
            </div>

            {/* Nav */}
            <nav className="space-y-0.5">
              {navItems.map(({ href, icon: Icon, en, fr, exact }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                    isActive(href, exact)
                      ? 'bg-primary text-white'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {L({ en, fr })}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4 flex-shrink-0" />
                {L({ en: 'Sign Out', fr: 'Déconnexion' })}
              </button>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
