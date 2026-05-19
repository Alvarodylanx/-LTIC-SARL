'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { customerFetch } from '@/contexts/CustomerContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface Quote {
  id: number;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  country?: string;
  productInterest: string;
  quantity?: string;
  message?: string;
  status: string;
  adminNotes?: string;
  createdAt: string;
}

const statusConfig: Record<string, { label: string; labelFr: string; icon: any; color: string }> = {
  pending:   { label: 'Pending',   labelFr: 'En attente',  icon: Clock,        color: 'bg-yellow-100 text-yellow-800' },
  reviewed:  { label: 'Reviewed',  labelFr: 'Examiné',     icon: MessageSquare, color: 'bg-blue-100 text-blue-800' },
  approved:  { label: 'Approved',  labelFr: 'Approuvé',    icon: CheckCircle,  color: 'bg-green-100 text-green-800' },
  rejected:  { label: 'Rejected',  labelFr: 'Rejeté',      icon: XCircle,      color: 'bg-red-100 text-red-800' },
};

export default function MyQuotesPage() {
  const { L } = useLanguage();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    customerFetch<Quote[]>('/api/customers/me/quotes')
      .then(setQuotes)
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
        <h2 className="text-xl font-bold">{L({ en: 'My Quotes', fr: 'Mes Devis' })}</h2>
        <p className="text-muted-foreground text-sm mt-1">
          {L({ en: 'View your quote requests and their status', fr: 'Consultez vos demandes de devis et leur statut' })}
        </p>
      </div>

      {quotes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-card border rounded-2xl p-12 text-center"
        >
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">{L({ en: 'No quotes yet', fr: 'Aucun devis' })}</h3>
          <p className="text-muted-foreground text-sm">
            {L({ en: 'Request a quote and it will appear here.', fr: 'Demandez un devis et il apparaîtra ici.' })}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {quotes.map((quote, i) => {
            const s = statusConfig[quote.status] || { label: quote.status, labelFr: quote.status, icon: Clock, color: 'bg-gray-100 text-gray-800' };
            const StatusIcon = s.icon;
            return (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-card border rounded-2xl p-5 hover:border-primary/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-semibold">{quote.productInterest}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {quote.companyName} {quote.quantity && `· ${quote.quantity}`}
                    </p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${s.color}`}>
                    <StatusIcon className="h-3 w-3" />
                    {L({ en: s.label, fr: s.labelFr })}
                  </span>
                </div>

                {quote.message && (
                  <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 mb-3">
                    {quote.message}
                  </p>
                )}

                {quote.adminNotes && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-3">
                    <p className="text-xs font-semibold text-primary mb-1">{L({ en: 'Response from LTIC', fr: 'Réponse de LTIC' })}</p>
                    <p className="text-sm">{quote.adminNotes}</p>
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  {new Date(quote.createdAt).toLocaleDateString()}
                </p>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

