'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCheck, Package, Newspaper, Settings, Truck } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { userApi } from '@/lib/api';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface Notif {
  id: number;
  type: string;
  titleEn: string;
  titleFr: string;
  messageEn: string;
  messageFr: string;
  link: string | null;
  read: boolean;
  createdAt: string;
}

const typeIcon: Record<string, any> = {
  product: Package,
  news: Newspaper,
  service: Settings,
  order: Truck,
};

export function NotificationBell() {
  const { user, token } = useUser();
  const { L, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState<Notif[]>([]);
  const [unread, setUnread] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    const load = () => userApi.get<Notif[]>('/api/notifications').then(data => {
      setNotifs(data);
      setUnread(data.filter(n => !n.read).length);
    }).catch(() => {});
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, [user, token]);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markRead = async (id: number) => {
    await userApi.patch(`/api/notifications/${id}/read`, {}).catch(() => {});
    setNotifs(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));
    setUnread(u => Math.max(0, u - 1));
  };

  const markAll = async () => {
    await userApi.patch('/api/notifications/mark-all-read', {}).catch(() => {});
    setNotifs(ns => ns.map(n => ({ ...n, read: true })));
    setUnread(0);
  };

  if (!user) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="relative p-2 rounded-lg hover:bg-muted transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5 text-muted-foreground" />
        {unread > 0 && (
          <motion.span
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center px-1"
          >
            {unread > 99 ? '99+' : unread}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-11 w-80 bg-background border rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="font-semibold text-sm">{L({ en: 'Notifications', fr: 'Notifications' })}</span>
              <div className="flex items-center gap-2">
                {unread > 0 && (
                  <button onClick={markAll} className="text-xs text-primary hover:underline flex items-center gap-1">
                    <CheckCheck className="h-3.5 w-3.5" />
                    {L({ en: 'Mark all read', fr: 'Tout marquer lu' })}
                  </button>
                )}
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground p-0.5">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto divide-y">
              {notifs.length === 0 ? (
                <div className="py-10 text-center text-muted-foreground text-sm">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  {L({ en: 'No notifications yet', fr: 'Aucune notification' })}
                </div>
              ) : notifs.map((n) => {
                const Icon = typeIcon[n.type] ?? Bell;
                const title = language === 'fr' ? n.titleFr : n.titleEn;
                const message = language === 'fr' ? n.messageFr : n.messageEn;
                const content = (
                  <div
                    onClick={() => !n.read && markRead(n.id)}
                    className={`flex gap-3 p-3 hover:bg-muted/50 transition-colors cursor-pointer ${!n.read ? 'bg-primary/5' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${!n.read ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-semibold truncate ${!n.read ? 'text-foreground' : 'text-muted-foreground'}`}>{title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{message}</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1">
                        {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    {!n.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />}
                  </div>
                );
                return n.link ? <Link key={n.id} href={n.link} onClick={() => setOpen(false)}>{content}</Link> : <div key={n.id}>{content}</div>;
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
