'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/lib/api';
import { format } from 'date-fns';

const statusColors: Record<string, string> = {
  processing: 'bg-blue-100 text-blue-700',
  'customs-cleared': 'bg-yellow-100 text-yellow-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  'in-transit': 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AdminOrdersPage() {
  const qc = useQueryClient();
  const { data: orders, isLoading } = useQuery<any[]>({
    queryKey: ['admin-orders'],
    queryFn: () => api.get('/api/orders?limit=100'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => api.patch(`/api/orders/${id}`, { status }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-orders'] }); toast.success('Order updated'); },
    onError: () => toast.error('Failed to update'),
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Orders & Shipments</h1>
        <p className="text-muted-foreground mt-1">Manage shipment tracking and order status</p>
      </div>

      {isLoading ? <div className="space-y-3">{Array(8).fill(0).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div> : (
        <div className="bg-card border rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-muted/50 border-b">
              <tr>
                {['Tracking #', 'Client', 'Origin', 'Destination', 'Status', 'Est. Delivery', 'Created'].map((h) => (
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
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="customs-cleared">Customs Cleared</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="in-transit">In Transit</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{order.estimatedDelivery || '—'}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{format(new Date(order.createdAt), 'dd MMM yyyy')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!orders?.length && <p className="text-center text-muted-foreground py-12">No orders yet</p>}
        </div>
      )}
    </div>
  );
}
