'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Package, AlertCircle, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/api';
import { format } from 'date-fns';
import { fadeInUp, scaleIn, stagger, viewportOnce } from '@/components/motion/variants';

const statusColors: Record<string, string> = {
  processing: 'bg-blue-100 text-blue-700 border-blue-200',
  'customs-cleared': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  shipped: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'in-transit': 'bg-purple-100 text-purple-700 border-purple-200',
  delivered: 'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};

const statusLabels: Record<string, { en: string; fr: string }> = {
  processing: { en: 'Processing', fr: 'En traitement' },
  'customs-cleared': { en: 'Customs Cleared', fr: 'Dédouané' },
  shipped: { en: 'Shipped', fr: 'Expédié' },
  'in-transit': { en: 'In Transit', fr: 'En Transit' },
  delivered: { en: 'Delivered', fr: 'Livré' },
  cancelled: { en: 'Cancelled', fr: 'Annulé' },
};

export default function TrackingPage() {
  const { L } = useLanguage();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    setIsLoading(true);
    setError(null);
    setOrder(null);
    setSearched(true);
    try {
      const result = await api.get<any>(`/api/orders/track?trackingNumber=${encodeURIComponent(trackingNumber.trim())}`);
      setOrder(result);
    } catch {
      setError(L({ en: 'Shipment Not Found', fr: 'Expédition Introuvable' }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="relative bg-sidebar py-20 overflow-hidden">
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 7 }}
          className="absolute left-1/4 top-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <motion.div variants={stagger} initial="hidden" animate="show"
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p variants={fadeInUp} className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            {L({ en: 'Real-Time Tracking', fr: 'Suivi en Temps Réel' })}
          </motion.p>
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold tracking-tight text-sidebar-foreground mb-4">
            {L({ en: 'Track Your Shipment', fr: 'Suivre Votre Expédition' })}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-sidebar-foreground/80 mb-10 max-w-xl mx-auto">
            {L({ en: 'Enter your tracking number to get real-time updates on your cargo.', fr: 'Entrez votre numéro de suivi pour obtenir des mises à jour en temps réel sur votre cargaison.' })}
          </motion.p>
          <motion.form variants={fadeInUp} onSubmit={handleTrack} className="max-w-xl mx-auto flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder={L({ en: 'Enter tracking number (e.g., TRK-2024-001)', fr: 'Entrez le numéro de suivi (ex: TRK-2024-001)' })}
                className="pl-10 h-12 text-foreground bg-background border-border" />
            </div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button type="submit" size="lg" disabled={isLoading || !trackingNumber.trim()} className="h-12">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : L({ en: 'Track', fr: 'Suivre' })}
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </section>

      <section className="bg-background py-12 min-h-[40vh]">
        <div className="max-w-3xl mx-auto px-4">
          <AnimatePresence mode="wait">
            {!searched && (
              <motion.div key="idle" variants={fadeInUp} initial="hidden" animate="show" exit={{ opacity: 0, y: -16 }}
                className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
                  <Package className="h-20 w-20 text-muted-foreground/30" />
                </motion.div>
                <p className="text-muted-foreground">
                  {L({ en: 'Enter your tracking number above to see shipment status and timeline.', fr: "Entrez votre numéro de suivi ci-dessus pour voir l'état de l'expédition et la chronologie." })}
                </p>
              </motion.div>
            )}

            {searched && isLoading && (
              <motion.div key="loading" variants={fadeInUp} initial="hidden" animate="show" exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 py-16">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">{L({ en: 'Locating your shipment...', fr: 'Localisation de votre expédition...' })}</p>
              </motion.div>
            )}

            {searched && error && !isLoading && (
              <motion.div key="error" variants={scaleIn} initial="hidden" animate="show"
                className="border border-destructive/40 bg-destructive/5 rounded-2xl p-8 text-center">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h2 className="text-xl font-bold text-destructive mb-2">{error}</h2>
                <p className="text-muted-foreground">
                  {L({ en: "The tracking number you entered was not found. Please check the number and try again.", fr: "Le numéro de suivi que vous avez entré n'a pas été trouvé. Veuillez vérifier le numéro et réessayer." })}
                </p>
              </motion.div>
            )}

            {searched && order && !isLoading && (
              <motion.div key="result" variants={stagger} initial="hidden" animate="show" className="space-y-6">
                <motion.div variants={scaleIn} className="bg-card border rounded-2xl p-6 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <span className="bg-primary/10 text-primary text-sm font-mono font-bold px-3 py-1 rounded-full">
                      {order.trackingNumber}
                    </span>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                      {L(statusLabels[order.status] || { en: order.status, fr: order.status })}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {[
                      { label: { en: 'Client Name', fr: 'Nom du Client' }, value: order.clientName },
                      { label: { en: 'Origin', fr: 'Origine' }, value: order.origin },
                      { label: { en: 'Destination', fr: 'Destination' }, value: order.destination },
                      { label: { en: 'Description', fr: 'Description' }, value: order.description },
                      { label: { en: 'Estimated Delivery', fr: 'Livraison Estimée' }, value: order.estimatedDelivery },
                    ].filter((item) => item.value).map(({ label, value }) => (
                      <div key={label.en}>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{L(label)}</p>
                        <p className="font-medium text-sm">{value}</p>
                      </div>
                    ))}
                  </div>

                  {order.timeline && order.timeline.length > 0 && (
                    <div>
                      <h3 className="font-bold mb-4">{L({ en: 'Shipment Timeline', fr: "Chronologie de l'Expédition" })}</h3>
                      <div className="space-y-4">
                        {[...(order.timeline as any[])].reverse().map((event: any, idx: number) => (
                          <motion.div key={idx} variants={fadeInUp}
                            className={`flex gap-4 ${idx === 0 ? 'opacity-100' : 'opacity-70'}`}>
                            <div className="flex flex-col items-center">
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                transition={{ delay: idx * 0.08, type: 'spring', stiffness: 400 }}
                                className={`w-3 h-3 rounded-full mt-1 ${idx === 0 ? 'bg-primary ring-4 ring-primary/20' : 'bg-muted-foreground/40'}`} />
                              {idx < (order.timeline.length - 1) && <div className="w-0.5 flex-1 bg-muted-foreground/20 mt-1 mb-0" />}
                            </div>
                            <div className="pb-4">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${statusColors[event.status] || 'bg-gray-100 text-gray-700'}`}>
                                  {L(statusLabels[event.status] || { en: event.status, fr: event.status })}
                                </span>
                                {idx === 0 && (
                                  <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
                                    {L({ en: 'Latest Update', fr: 'Dernière Mise à Jour' })}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm font-medium mb-1">{event.description}</p>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {format(new Date(event.date), 'dd MMM yyyy, HH:mm')}
                                </span>
                                {event.location && (
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {event.location}
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
