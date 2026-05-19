'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, Tag, FileText, Truck, Newspaper, MessageSquare, Settings, LogOut, ShieldAlert, UserCircle, GitBranch } from 'lucide-react';
import { cn } from '@/lib/utils';
import { checkAuth, logout } from '@/lib/auth';

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/products', icon: Package, label: 'Products' },
  { href: '/admin/categories', icon: Tag, label: 'Categories' },
  { href: '/admin/quotes', icon: FileText, label: 'Quotes' },
  { href: '/admin/orders', icon: Truck, label: 'Orders' },
  { href: '/admin/news', icon: Newspaper, label: 'News' },
  { href: '/admin/contacts', icon: MessageSquare, label: 'Contacts' },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
  { href: '/admin/changelog', icon: GitBranch, label: 'Changelog' },
  { href: '/admin/profile', icon: UserCircle, label: 'My Profile' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    checkAuth().then((res) => {
      if (!res.authenticated) router.push('/admin');
      else setUsername(res.username || 'Admin');
    });
  }, [router]);

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
        <p className="text-xs text-sidebar-foreground/60">Admin Panel</p>
        {username && <p className="text-xs text-sidebar-foreground/60 mt-1">Logged in as <span className="text-sidebar-foreground">{username}</span></p>}
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
              pathname === href || pathname.startsWith(href + '/')
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
