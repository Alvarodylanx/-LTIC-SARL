'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Package, FileText, Settings, ArrowRight, MapPin, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCustomer } from '@/contexts/CustomerContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AccountDashboard() {
  const { customer } = useCustomer();
  const { L } = useLanguage();

  if (!customer) return null;

  const cards = [
    {
      href: '/account/orders',
      icon: Package,
      en: 'My Orders',
      fr: 'Mes Commandes',
      descEn: 'Track your shipments and view order history',
      descFr: 'Suivez vos expéditions et consultez l\'historique',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      href: '/account/quotes',
      icon: FileText,
      en: 'My Quotes',
      fr: 'Mes Devis',
      descEn: 'View quote requests and their status',
      descFr: 'Consultez vos demandes de devis et leur statut',
      color: 'text-green-600 bg-green-50',
    },
    {
      href: '/account/profile',
      icon: Settings,
      en: 'Profile Settings',
      fr: 'Paramètres du profil',
      descEn: 'Update your personal information and password',
      descFr: 'Mettez à jour vos informations et mot de passe',
      color: 'text-purple-600 bg-purple-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl p-6"
      >
        <h1 className="text-2xl font-bold mb-1">
          {L({ en: `Welcome back, ${customer.fullName.split(' ')[0]}!`, fr: `Bon retour, ${customer.fullName.split(' ')[0]}!` })}
        </h1>
        <p className="text-white/80 text-sm">
          {L({ en: 'Manage your shipments and account from one place.', fr: 'Gérez vos expéditions et votre compte en un seul endroit.' })}
        </p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-white/90">
          {customer.country && (
            <span className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5" />
              {customer.country}
            </span>
          )}
          {customer.phone && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {customer.phone}
            </span>
          )}
        </div>
      </motion.div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {cards.map(({ href, icon: Icon, en, fr, descEn, descFr, color }, i) => (
          <motion.div
            key={href}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              href={href}
              className="group block bg-card border rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-1">{L({ en, fr })}</h3>
              <p className="text-xs text-muted-foreground mb-3">{L({ en: descEn, fr: descFr })}</p>
              <span className="text-xs font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                {L({ en: 'View', fr: 'Voir' })} <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick quote CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-muted/50 border rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h3 className="font-semibold">{L({ en: 'Need a new quote?', fr: 'Besoin d\'un nouveau devis?' })}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {L({ en: 'Get competitive shipping rates for your cargo.', fr: 'Obtenez des tarifs compétitifs pour votre fret.' })}
          </p>
        </div>
        <Button asChild size="sm" className="flex-shrink-0">
          <Link href="/quote">{L({ en: 'Request Quote', fr: 'Demander un devis' })}</Link>
        </Button>
      </motion.div>
    </div>
  );
}

