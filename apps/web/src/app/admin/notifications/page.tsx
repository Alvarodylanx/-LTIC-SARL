'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Bell, CheckCheck, Trash2, FileText, MessageSquare, Package, Info } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';

const TYPE_META: Record<string, { icon: any; color: string }> = {
  quote:   { icon: FileText,      color: 'bg-blue-100 text-blue-600' },
  contact: { icon: MessageSquare, color: 'bg-purple-100 text-purple-600' },
  order:   { icon: Package,       color: 'bg-orange-100 text-orange-600' },
};

export default function AdminNotificationsPage() {
  const qc = useQueryClient();
  const { L } = useLanguage();

  const { data: notifications = [], isLoading } = useQuery<any[]>({
    queryKey: ['admin-notifications'],
    queryFn: () => api.get('/api/notifications'),
    refetchInterval: 30_000,
  });

  const markRead = useMutation({
    mutationFn: (id: number) => api.patch(`/api/notifications/${id}/read`, {}),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-notifications'] }),
  });

  const markAllRead = useMutation({
    mutationFn: () => api.patch('/api/notifications/read-all', {}),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-notifications'] });
      toast.success(L({ en: 'All notifications marked as read', fr: 'Toutes les notifications lues' }));
    },
  });

  const remove = useMutation({
    mutationFn: (id: number) => api.delete(`/api/notifications/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-notifications'] }),
  });

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
            <Bell className="h-7 w-7" />
            {L({ en: 'Notifications', fr: 'Notifications' })}
            {unread > 0 && (
              <span className="bg-red-500 text-white text-sm font-bold px-2 py-0.5 rounded-full">
                {unread}
              </span>
            )}
          </h1>
          <p className="text-muted-foreground mt-1">
            {L({ en: 'Website activity alerts — new quotes, contacts, and orders', fr: 'Alertes d\'activité — nouvelles demandes, messages et commandes' })}
          </p>
        </div>
        {unread > 0 && (
          <Button
            variant="outline"
            onClick={() => markAllRead.mutate()}
            disabled={markAllRead.isPending}
            className="flex items-center gap-2"
          >
            <CheckCheck className="h-4 w-4" />
            {L({ en: 'Mark all as read', fr: 'Tout marquer comme lu' })}
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-24 text-muted-foreground">
          <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">{L({ en: 'No notifications yet', fr: 'Aucune notification' })}</p>
          <p className="text-sm mt-1">{L({ en: 'You\'ll be notified here when customers submit quotes or messages.', fr: 'Vous serez notifié ici lorsque des clients envoient des demandes ou messages.' })}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => {
            const meta = TYPE_META[n.type] ?? { icon: Info, color: 'bg-gray-100 text-gray-600' };
            const Icon = meta.icon;
            return (
              <div
                key={n.id}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${!n.read ? 'bg-blue-50/50 border-blue-100' : 'bg-card border-border'}`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${meta.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-semibold truncate ${!n.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {n.title}
                    </p>
                    {!n.read && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.message}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {!n.read && (
                    <button
                      onClick={() => markRead.mutate(n.id)}
                      title={L({ en: 'Mark as read', fr: 'Marquer comme lu' })}
                      className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <CheckCheck className="h-3.5 w-3.5" />
                    </button>
                  )}
                  {n.link && (
                    <a
                      href={n.link}
                      className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground text-xs font-medium px-2"
                    >
                      {L({ en: 'View', fr: 'Voir' })}
                    </a>
                  )}
                  <button
                    onClick={() => remove.mutate(n.id)}
                    title={L({ en: 'Delete', fr: 'Supprimer' })}
                    className="p-1.5 rounded hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
