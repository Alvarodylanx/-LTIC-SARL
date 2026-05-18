'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function AdminContactsPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const qc = useQueryClient();

  const { data: contacts, isLoading } = useQuery<any[]>({
    queryKey: ['admin-contacts'],
    queryFn: () => api.get('/api/contacts?limit=100'),
  });

  const markReadMutation = useMutation({
    mutationFn: ({ id, read }: { id: number; read: boolean }) => api.patch(`/api/contacts/${id}`, { read }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-contacts'] }),
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Contact Inquiries</h1>
        <p className="text-muted-foreground mt-1">Manage incoming contact messages</p>
      </div>

      {isLoading ? <div className="space-y-3">{Array(8).fill(0).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div> : (
        <div className="bg-card border rounded-xl overflow-hidden space-y-0">
          {contacts?.map((contact) => (
            <div key={contact.id} className={`border-b last:border-0 ${!contact.read ? 'border-l-4 border-l-primary' : ''}`}>
              <div
                className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted/20 transition-colors"
                onClick={() => {
                  setExpanded(expanded === contact.id ? null : contact.id);
                  if (!contact.read) markReadMutation.mutate({ id: contact.id, read: true });
                }}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {!contact.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-sm">{contact.name}</span>
                      {contact.company && <span className="text-muted-foreground text-xs">— {contact.company}</span>}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{contact.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="text-xs text-muted-foreground">{format(new Date(contact.createdAt), 'dd MMM yyyy')}</span>
                  {expanded === contact.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </div>
              </div>
              {expanded === contact.id && (
                <div className="px-6 pb-5 bg-muted/10">
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div><span className="text-muted-foreground">Email: </span><a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a></div>
                    {contact.phone && <div><span className="text-muted-foreground">Phone: </span>{contact.phone}</div>}
                  </div>
                  <div className="bg-background rounded-lg p-4 border">
                    <p className="text-sm leading-relaxed">{contact.message}</p>
                  </div>
                  <button
                    onClick={() => markReadMutation.mutate({ id: contact.id, read: !contact.read })}
                    className="mt-3 text-xs text-primary hover:underline"
                  >
                    {contact.read ? 'Mark as Unread' : 'Mark as Read'}
                  </button>
                </div>
              )}
            </div>
          ))}
          {!contacts?.length && <p className="text-center text-muted-foreground py-12">No contact messages yet</p>}
        </div>
      )}
    </div>
  );
}
