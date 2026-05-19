'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Package, ExternalLink, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react';
import { customerFetch } from '@/contexts/CustomerContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';

interface Order {
  id: number;
  trackingNumber: string;
  clientName: string;
  origin?: string;
  destination?: string;
  description?: string;
  status: string;
  estimatedDelivery?: string;
  createdAt: string;
}

const statusConfig: Record<string, { label: string; labelFr: string; icon: any; color: string }> = {
  processing:  { label: 'Processing',  labelFr: 'En traitement',   icon: Clock,        color: 'bg-yellow-100 text-yellow-800' },
  in_transit:  { label: 'In Transit',  labelFr: 'En transit',      icon: Truck,        color: 'bg-blue-100 text-blue-800' },
  delivered:   { label: 'Delivered',   labelFr: 'Livré',           icon: CheckCircle,  color: 'bg-green-100 text-green-800' },
  on_hold:     { label: 'On Hold',     labelFr: 'En attente',      icon: AlertCircle,  color: 'bg-red-100 text-red-800' },
};

export default function MyOrdersPage() {
  const { L } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    customerFetch<Order[]>('/api/customers/me/orders')
      .then(setOrders)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">{L({ en: 'My Orders', fr: 'Mes Commandes' })}</h2>
        <p className="text-muted-foreground text-sm mt-1">
          {L({ en: 'Track all your shipments', fr: 'Suivez toutes vos expéditions' })}
        </p>
      </div>

      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-card border rounded-2xl p-12 text-center"
        >
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">{L({ en: 'No orders yet', fr: 'Aucune commande' })}</h3>
          <p className="text-muted-foreground text-sm">
            {L({ en: 'Your orders will appear here once created by our team.', fr: 'Vos commandes apparaîtront ici une fois créées par notre équipe.' })}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {orders.map((order, i) => {
            const s = statusConfig[order.status] || { label: order.status, labelFr: order.status, icon: Clock, color: 'bg-gray-100 text-gray-800' };
            const StatusIcon = s.icon;
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-card border rounded-2xl p-5 hover:border-primary/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm font-mono">{order.trackingNumber}</p>
                      {order.description && (
                        <p className="text-xs text-muted-foreground mt-0.5">{order.description}</p>
                      )}
                      {(order.origin || order.destination) && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {order.origin} → {order.destination}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${s.color}`}>
                      <StatusIcon className="h-3 w-3" />
                      {L({ en: s.label, fr: s.labelFr })}
                    </span>
                    {order.estimatedDelivery && (
                      <p className="text-xs text-muted-foreground">{L({ en: 'Est.', fr: 'Livraison estimée:' })} {order.estimatedDelivery}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t">
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <Link
                    href={`/tracking?id=${order.trackingNumber}`}
                    className="flex items-center gap-1 text-xs text-primary font-medium hover:underline"
                  >
                    {L({ en: 'Track Order', fr: 'Suivre' })} <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
