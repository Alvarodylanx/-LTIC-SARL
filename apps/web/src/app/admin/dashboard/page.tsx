'use client';

import { useQuery } from '@tanstack/react-query';
import { Package, FileText, Truck, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';
import { format } from 'date-fns';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  reviewed: 'bg-blue-100 text-blue-700',
  responded: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-700',
};

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery<any>({
    queryKey: ['stats', 'dashboard'],
    queryFn: () => api.get('/api/stats/dashboard'),
  });

  const statCards = [
    { label: 'Total Products', icon: Package, value: stats?.totalProducts, color: 'text-foreground' },
    { label: 'Pending Quotes', icon: FileText, value: stats?.pendingQuotes, color: 'text-primary' },
    { label: 'Active Orders', icon: Truck, value: stats?.totalOrders, color: 'text-foreground' },
    { label: 'Unread Inquiries', icon: MessageSquare, value: stats?.unreadContacts, color: 'text-primary' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your LTIC SARL operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map(({ label, icon: Icon, value, color }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <Icon className={`h-5 w-5 ${color}`} />
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-8 w-16" /> : <p className={`text-3xl font-bold ${color}`}>{value ?? 0}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Quotes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">{Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
            ) : (
              <div className="space-y-3">
                {stats?.recentQuotes?.map((quote: any) => (
                  <div key={quote.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium text-sm">{quote.companyName}</p>
                      <p className="text-xs text-muted-foreground">{format(new Date(quote.createdAt), 'dd MMM yyyy')}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[quote.status] || 'bg-gray-100 text-gray-700'}`}>
                      {quote.status}
                    </span>
                  </div>
                )) || <p className="text-muted-foreground text-sm">No quotes yet</p>}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">{Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
            ) : (
              <div className="space-y-3">
                {stats?.recentContacts?.map((contact: any) => (
                  <div key={contact.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium text-sm">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.subject}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{format(new Date(contact.createdAt), 'dd MMM')}</span>
                      {!contact.read && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                  </div>
                )) || <p className="text-muted-foreground text-sm">No contacts yet</p>}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
