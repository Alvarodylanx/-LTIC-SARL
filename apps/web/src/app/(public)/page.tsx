'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Globe2, Ship, Factory, BarChart3, Handshake, TreePine, Shield, Zap, TrendingUp, CheckCircle2, Package, FileText, Clock, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/api';
import { fadeInUp, fadeInLeft, fadeInRight, fadeIn, scaleIn, stagger, staggerFast, viewportOnce } from '@/components/motion/variants';

const stats = [
  { value: '30+', en: 'Countries Served', fr: 'Pays Desservis' },
  { value: '500+', en: 'Clients Worldwide', fr: 'Clients Mondiaux' },
  { value: '15+', en: 'Years of Experience', fr: "Années d'Expérience" },
  { value: '10K+', en: 'Shipments Completed', fr: 'Expéditions Réalisées' },
];

const services = [
  { icon: Ship, en: 'Logistics & Transit', fr: 'Logistique & Transit', descEn: 'End-to-end freight forwarding, customs clearance, and international transit across air, sea and road.', descFr: 'Freight forwarding complet, dédouanement et transit international aérien, maritime et routier.' },
  { icon: Globe2, en: 'Import & Export', fr: 'Import & Export', descEn: 'Seamless global trade facilitation with compliance, documentation and strategic sourcing expertise.', descFr: 'Facilitation du commerce mondial avec conformité, documentation et expertise en sourcing stratégique.' },
  { icon: Factory, en: 'Industrial Supply', fr: 'Fourniture Industrielle', descEn: 'Generators, lubricants, filters, and heavy industrial materials delivered to specification.', descFr: 'Générateurs, lubrifiants, filtres et matériaux industriels lourds livrés selon spécifications.' },
  { icon: TreePine, en: 'Timber & Trade', fr: 'Bois & Commerce', descEn: 'Premium certified tropical timber and logs for international construction and woodworking markets.', descFr: "Bois tropicaux certifiés premium pour la construction internationale et les marchés du bois." },
  { icon: BarChart3, en: 'Supply Chain Consulting', fr: "Conseil Chaîne d'Approvisionnement", descEn: 'Strategic procurement and logistics optimization for enterprises operating in complex markets.', descFr: "Optimisation stratégique des achats et de la logistique pour entreprises sur marchés complexes." },
  { icon: Handshake, en: 'Commercial Representation', fr: 'Représentation Commerciale', descEn: 'Brand and market representation, joint ventures, and strategic business partnerships.', descFr: "Représentation de marque, coentreprises et partenariats commerciaux stratégiques." },
];

const industries = [
  { en: 'Oil & Gas', fr: 'Pétrole & Gaz' },
  { en: 'Mining & Extraction', fr: 'Mines & Extraction' },
  { en: 'Construction', fr: 'Construction' },
  { en: 'Agriculture', fr: 'Agriculture' },
  { en: 'Manufacturing', fr: 'Industrie Manufacturière' },
  { en: 'Forestry', fr: 'Foresterie' },
  { en: 'Energy', fr: 'Énergie' },
  { en: 'Public Works', fr: 'Travaux Publics' },
];

const orderSteps = [
  {
    icon: Package,
    title: { en: 'Browse Our Catalog', fr: 'Parcourez Notre Catalogue' },
    desc:  { en: 'Explore our industrial products — timber, generators, lubricants, and more. Find what you need and note the product name.', fr: 'Explorez nos produits industriels — bois, générateurs, lubrifiants et plus encore. Trouvez ce qu\'il vous faut.' },
    action: { en: 'View Catalog', fr: 'Voir le Catalogue' },
    href: '/products',
  },
  {
    icon: FileText,
    title: { en: 'Request a Quote', fr: 'Demandez un Devis' },
    desc:  { en: 'Fill in our quote form with the product, quantity, destination and any special requirements. Takes less than 2 minutes.', fr: 'Remplissez notre formulaire avec le produit, la quantité, la destination et vos exigences. Moins de 2 minutes.' },
    action: { en: 'Get a Quote', fr: 'Obtenir un Devis' },
    href: '/quote',
  },
  {
    icon: Clock,
    title: { en: 'Receive Your Offer', fr: 'Recevez Votre Offre' },
    desc:  { en: 'Our team reviews your request and sends a custom price with freight costs, customs fees, and delivery timeline within 24–48 hours.', fr: 'Notre équipe analyse votre demande et vous envoie une offre personnalisée avec frais de transport et délais sous 24–48h.' },
    action: null,
    href: null,
  },
  {
    icon: Truck,
    title: { en: 'Track Your Shipment', fr: 'Suivez Votre Livraison' },
    desc:  { en: 'Once you confirm the offer, we handle everything — customs, freight, logistics. Track your order in real time with your tracking number.', fr: 'Une fois l\'offre confirmée, nous gérons tout — douanes, fret, logistique. Suivez votre commande en temps réel.' },
    action: { en: 'Track a Shipment', fr: 'Suivre une Livraison' },
    href: '/tracking',
  },
];

export default function HomePage() {
  const { L } = useLanguage();
  const { data: featuredProducts, isLoading } = useQuery<any[]>({
    queryKey: ['products', 'featured'],
    queryFn: () => api.get('/api/products/featured'),
  });

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[85vh] sm:min-h-[92vh] bg-sidebar flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1800&auto=format&fit=crop&q=70"
            alt="Logistics hero" fill className="object-cover opacity-20" priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sidebar via-sidebar/90 to-sidebar/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <motion.div variants={fadeIn} initial="hidden" animate="show"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm mb-8">
              <Globe2 className="h-4 w-4" />
              {L({ en: 'Multinational Business Solutions Provider', fr: "Fournisseur de Solutions d'Affaires Multinationales" })}
            </motion.div>
            <motion.h1 variants={fadeInUp} initial="hidden" animate="show"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-sidebar-foreground mb-6 leading-[1.1]">
              {L({ en: 'Driving Global Trade Through', fr: 'Propulser le Commerce Mondial via une' })}{' '}
              <span className="text-primary">{L({ en: 'Reliable Logistics', fr: 'Logistique Fiable' })}</span>{' '}
              {L({ en: '& Industrial Solutions', fr: '& des Solutions Industrielles' })}
            </motion.h1>
            <motion.p variants={fadeInUp} initial="hidden" animate="show" transition={{ delay: 0.1 }}
              className="text-base sm:text-lg md:text-xl text-sidebar-foreground/80 mb-8 sm:mb-10 max-w-2xl leading-relaxed">
              {L({ en: 'LTIC SARL connects markets, industries and opportunities worldwide — delivering end-to-end logistics, industrial supply, and international trade solutions with precision and reliability.', fr: 'LTIC SARL connecte marchés, industries et opportunités dans le monde entier — offrant des solutions logistiques complètes, de fournitures industrielles et de commerce international.' })}
            </motion.p>
            <motion.div variants={fadeInUp} initial="hidden" animate="show" transition={{ delay: 0.18 }} className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button asChild size="lg" className="text-base px-8 shadow-lg shadow-primary/30">
                  <Link href="/quote">{L({ en: 'Request a Quote', fr: 'Demander un Devis' })}<ArrowRight className="h-5 w-5 ml-2" /></Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button asChild size="lg" variant="outline" className="text-base px-8 bg-transparent border-white/50 text-white hover:bg-white/10 hover:text-white">
                  <Link href="/services">{L({ en: 'Explore Services', fr: 'Voir nos Services' })}</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
        {/* Floating decorative orbs */}
        <motion.div animate={{ y: [0, -18, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="absolute right-0 sm:right-10 top-1/3 w-40 sm:w-72 h-40 sm:h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <motion.div animate={{ y: [0, 14, 0] }} transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
          className="hidden sm:block absolute right-40 bottom-20 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
      </section>

      {/* ─── Stats ─── */}
      <section className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerFast} initial="hidden" whileInView="show" viewport={viewportOnce}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <motion.div key={stat.value} variants={scaleIn}>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">{L(stat)}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{L({ en: 'What We Do', fr: 'Ce Que Nous Faisons' })}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">{L({ en: 'Comprehensive Business Solutions', fr: "Solutions d'Affaires Complètes" })}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {L({ en: 'From freight forwarding to industrial supply and strategic partnerships — we cover the full spectrum of global business operations.', fr: "Du freight forwarding à la fourniture industrielle et aux partenariats stratégiques — nous couvrons tout le spectre des opérations mondiales." })}
            </p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewportOnce}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map(({ icon: Icon, ...svc }) => (
              <motion.div key={svc.en} variants={fadeInUp}
                whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group bg-card border rounded-xl p-5 sm:p-6 lg:p-8 hover:border-primary/40 transition-colors duration-300 cursor-default">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-7 w-7" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{L({ en: svc.en, fr: svc.fr })}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{L({ en: svc.descEn, fr: svc.descFr })}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="text-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">{L({ en: 'View All Services', fr: 'Voir Tous les Services' })}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section className="bg-muted/40 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeInLeft} initial="hidden" whileInView="show" viewport={viewportOnce}>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{L({ en: 'Why LTIC SARL', fr: 'Pourquoi LTIC SARL' })}</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-6">{L({ en: 'Your Strategic Partner for Global Operations', fr: 'Votre Partenaire Stratégique pour les Opérations Mondiales' })}</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {L({ en: 'LTIC SARL is more than a logistics company — we are a multinational business solutions provider with the networks, expertise, and operational capacity to handle your most complex international requirements.', fr: "LTIC SARL est plus qu'une société de logistique — nous sommes un fournisseur de solutions d'affaires multinationales avec les réseaux, l'expertise et la capacité opérationnelle." })}
              </p>
              <ul className="space-y-3">
                {[
                  { en: 'Multinational trade network across Africa, Europe, Middle East & Americas', fr: "Réseau commercial multinational en Afrique, Europe, Moyen-Orient & Amériques" },
                  { en: 'Full-spectrum logistics: freight, customs, warehousing, last-mile delivery', fr: "Logistique complète: fret, douane, entreposage, livraison dernier kilomètre" },
                  { en: 'Certified industrial supply partners — Total, Shell and leading OEM brands', fr: "Partenaires certifiés — Total, Shell et grandes marques OEM" },
                  { en: 'Dedicated account management and 24/7 shipment tracking', fr: "Gestion de compte dédiée et suivi d'expédition 24h/7j" },
                  { en: 'Phytosanitary treatment and regulatory compliance services', fr: "Services de traitement phytosanitaire et conformité réglementaire" },
                  { en: 'Transparent pricing, structured documentation, on-time delivery', fr: "Tarification transparente, documentation structurée, livraison à temps" },
                ].map((item, i) => (
                  <motion.li key={i} variants={fadeInLeft} initial="hidden" whileInView="show" viewport={viewportOnce}
                    transition={{ delay: i * 0.07 }} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{L(item)}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewportOnce} className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, en: 'Reliability', fr: 'Fiabilité', descEn: 'On-time delivery backed by structured documentation and tracking.', descFr: 'Livraison à temps avec documentation structurée et suivi.' },
                { icon: Globe2, en: 'Global Network', fr: 'Réseau Mondial', descEn: 'Established connections across 30+ countries and key trade corridors.', descFr: 'Connexions établies dans 30+ pays et corridors commerciaux clés.' },
                { icon: Zap, en: 'Efficiency', fr: 'Efficacité', descEn: 'Optimized supply chains reducing cost and transit time.', descFr: "Chaînes d'approvisionnement optimisées réduisant coûts et délais." },
                { icon: TrendingUp, en: 'Growth', fr: 'Croissance', descEn: 'Strategic partnerships that open new markets and opportunities.', descFr: "Partenariats stratégiques ouvrant de nouveaux marchés et opportunités." },
              ].map(({ icon: Icon, ...card }) => (
                <motion.div key={card.en} variants={scaleIn}
                  whileHover={{ y: -4, boxShadow: '0 12px 30px -8px rgba(0,0,0,0.12)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="bg-card border rounded-xl p-6">
                  <Icon className="h-8 w-8 text-primary mb-3" />
                  <h4 className="font-bold mb-2 text-sm">{L({ en: card.en, fr: card.fr })}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{L({ en: card.descEn, fr: card.descFr })}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Featured Products ─── */}
      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{L({ en: 'Industrial Catalog', fr: 'Catalogue Industriel' })}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">{L({ en: 'Featured Products', fr: 'Produits en Vedette' })}</h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewportOnce}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {isLoading
              ? Array(8).fill(0).map((_, i) => (
                  <div key={i} className="bg-card border rounded-xl overflow-hidden">
                    <Skeleton className="aspect-[4/3] w-full" />
                    <div className="p-4 space-y-2"><Skeleton className="h-4 w-16" /><Skeleton className="h-5 w-full" /></div>
                  </div>
                ))
              : featuredProducts?.map((product) => (
                  <motion.div key={product.id} variants={fadeInUp}
                    whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                    <Link href={`/products/${product.slug}`}
                      className="group bg-card border rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-300 block">
                      <div className="aspect-[4/3] relative bg-muted overflow-hidden">
                        {product.imageUrl && (
                          <Image src={product.imageUrl} alt={L({ en: product.nameEn, fr: product.nameFr })} fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-4">
                        {product.categoryName && (
                          <span className="inline-block bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5 mb-2">{product.categoryName}</span>
                        )}
                        <h3 className="font-bold text-sm leading-tight group-hover:text-primary transition-colors">
                          {L({ en: product.nameEn, fr: product.nameFr })}
                        </h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
          </motion.div>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="text-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button asChild variant="outline" size="lg">
                <Link href="/products">{L({ en: 'Browse Full Catalog', fr: 'Parcourir le Catalogue' })}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Industries ─── */}
      <section className="bg-muted/40 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 variants={fadeInUp} initial="hidden" whileInView="show" viewport={viewportOnce}
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-8 sm:mb-12">
            {L({ en: 'Industries We Serve', fr: 'Secteurs que Nous Servons' })}
          </motion.h2>
          <motion.div variants={staggerFast} initial="hidden" whileInView="show" viewport={viewportOnce}
            className="flex flex-wrap justify-center gap-3">
            {industries.map((ind) => (
              <motion.span key={ind.en} variants={scaleIn}
                whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}
                className="bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-2 text-sm font-medium cursor-default">
                {L(ind)}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── How to Order ─── */}
      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
              {L({ en: 'Simple Process', fr: 'Processus Simple' })}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {L({ en: 'How to Place an Order', fr: 'Comment Passer une Commande' })}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              {L({ en: 'From browsing our catalog to tracking your shipment — four simple steps.', fr: 'Du catalogue à la livraison — quatre étapes simples.' })}
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewportOnce}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {orderSteps.map((step, i) => (
              <motion.div key={i} variants={fadeInUp} className="relative flex flex-col items-center text-center group">
                {/* connector line */}
                {i < orderSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-gradient-to-r from-primary/40 to-primary/10" />
                )}
                {/* step number badge */}
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                    <step.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-2">{L(step.title)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{L(step.desc)}</p>
                {step.href && step.action && (
                  <Link href={step.href}
                    className="mt-auto inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-2.5 transition-all">
                    {L(step.action)} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 6 }}
          className="absolute right-10 top-10 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 8, delay: 2 }}
          className="absolute left-10 bottom-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 variants={fadeInUp} initial="hidden" whileInView="show" viewport={viewportOnce}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground mb-6">
            {L({ en: 'Ready to Optimize Your Global Operations?', fr: 'Prêt à Optimiser Vos Opérations Mondiales ?' })}
          </motion.h2>
          <motion.p variants={fadeInUp} initial="hidden" whileInView="show" viewport={viewportOnce}
            className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {L({ en: 'Join 500+ businesses that trust LTIC SARL for their logistics, supply, and international trade needs.', fr: 'Rejoignez 500+ entreprises qui font confiance à LTIC SARL pour leurs besoins en logistique, fournitures et commerce international.' })}
          </motion.p>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewportOnce}
            className="flex flex-wrap gap-4 justify-center">
            <motion.div variants={scaleIn} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg text-base px-8 font-semibold">
                <Link href="/contact">{L({ en: 'Contact Our Team', fr: 'Contacter Notre Équipe' })}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

