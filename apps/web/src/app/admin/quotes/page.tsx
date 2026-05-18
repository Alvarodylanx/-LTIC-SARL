'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/lib/api';
import { format } from 'date-fns';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  reviewed: 'bg-blue-100 text-blue-700',
  responded: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-700',
};

export default function AdminQuotesPage() {
  const qc = useQueryClient();
  const { data: quotes, isLoading } = useQuery<any[]>({
    queryKey: ['admin-quotes'],
    queryFn: () => api.get('/api/quotes?limit=100'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => api.patch(`/api/quotes/${id}`, { status }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-quotes'] }); toast.success('Quote updated'); },
    onError: () => toast.error('Failed to update'),
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Quote Requests</h1>
        <p className="text-muted-foreground mt-1">Manage incoming quote requests</p>
      </div>

      {isLoading ? <div className="space-y-3">{Array(8).fill(0).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div> : (
        <div className="bg-card border rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-muted/50 border-b">
              <tr>
                {['Date', 'Company', 'Contact', 'Email', 'Product Interest', 'Qty', 'Status'].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {quotes?.map((quote) => (
                <tr key={quote.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 text-xs text-muted-foreground">{format(new Date(quote.createdAt), 'dd MMM yyyy')}</td>
                  <td className="px-4 py-3 font-medium text-sm">{quote.companyName}</td>
                  <td className="px-4 py-3 text-sm">{quote.contactName}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{quote.email}</td>
                  <td className="px-4 py-3 text-sm max-w-[180px] truncate">{quote.productInterest}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{quote.quantity || '—'}</td>
                  <td className="px-4 py-3">
                    <Select
                      value={quote.status}
                      onValueChange={(val) => updateMutation.mutate({ id: quote.id, status: val })}
                    >
                      <SelectTrigger className="h-8 text-xs w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="responded">Responded</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!quotes?.length && <p className="text-center text-muted-foreground py-12">No quote requests yet</p>}
        </div>
      )}
    </div>
  );
}
