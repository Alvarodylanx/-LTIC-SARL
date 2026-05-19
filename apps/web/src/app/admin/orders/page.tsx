'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';

export default function AdminOrdersPage() {
  const qc = useQueryClient();
  const { L } = useLanguage();

  const { data: orders, isLoading } = useQuery<any[]>({
    queryKey: ['admin-orders'],
    queryFn: () => api.get('/api/orders?limit=100'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => api.patch(`/api/orders/${id}`, { status }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-orders'] }); toast.success(L({ en: 'Order updated', fr: 'Commande mise à jour' })); },
    onError: () => toast.error(L({ en: 'Failed to update', fr: 'Échec de la mise à jour' })),
  });

  const headers = [
    L({ en: 'Tracking #', fr: 'N° suivi' }),
    L({ en: 'Client', fr: 'Client' }),
    L({ en: 'Origin', fr: 'Origine' }),
    L({ en: 'Destination', fr: 'Destination' }),
    L({ en: 'Status', fr: 'Statut' }),
    L({ en: 'Est. Delivery', fr: 'Livraison prévue' }),
    L({ en: 'Created', fr: 'Créé le' }),
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{L({ en: 'Orders & Shipments', fr: 'Commandes & Expéditions' })}</h1>
        <p className="text-muted-foreground mt-1">{L({ en: 'Manage shipment tracking and order status', fr: 'Gérez le suivi des expéditions et le statut des commandes' })}</p>
      </div>

      {isLoading ? <div className="space-y-3">{Array(8).fill(0).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div> : (
        <div className="bg-card border rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-muted/50 border-b">
              <tr>
                {headers.map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders?.map((order) => (
                <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-mono text-sm font-bold text-primary">{order.trackingNumber}</td>
                  <td className="px-4 py-3 font-medium text-sm">{order.clientName}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{order.origin}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{order.destination}</td>
                  <td className="px-4 py-3">
                    <Select value={order.status} onValueChange={(val) => updateMutation.mutate({ id: order.id, status: val })}>
                      <SelectTrigger className="h-8 text-xs w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="processing">{L({ en: 'Processing', fr: 'En traitement' })}</SelectItem>
                        <SelectItem value="customs-cleared">{L({ en: 'Customs Cleared', fr: 'Dédouané' })}</SelectItem>
                        <SelectItem value="shipped">{L({ en: 'Shipped', fr: 'Expédié' })}</SelectItem>
                        <SelectItem value="in-transit">{L({ en: 'In Transit', fr: 'En transit' })}</SelectItem>
                        <SelectItem value="delivered">{L({ en: 'Delivered', fr: 'Livré' })}</SelectItem>
                        <SelectItem value="cancelled">{L({ en: 'Cancelled', fr: 'Annulé' })}</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{order.estimatedDelivery || '—'}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{format(new Date(order.createdAt), 'dd MMM yyyy')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!orders?.length && <p className="text-center text-muted-foreground py-12">{L({ en: 'No orders yet', fr: 'Aucune commande pour l\'instant' })}</p>}
        </div>
      )}
    </div>
  );
}
