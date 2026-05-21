'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Target, Globe2, ShieldCheck, Lightbulb, Leaf, TrendingUp, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, stagger, staggerFast, viewportOnce } from '@/components/motion/variants';

const values = [
  { icon: ShieldCheck, en: 'Reliability', fr: 'Fiabilité', descEn: 'Committed to delivering on every promise — on time, in full, and with complete transparency.', descFr: 'Engagés à tenir chaque promesse — à temps, intégralement et avec une totale transparence.' },
  { icon: Target, en: 'Professionalism', fr: 'Professionnalisme', descEn: 'Maintaining the highest standards of expertise, conduct, and accountability in every business interaction.', descFr: "Maintenir les plus hauts standards d'expertise, de conduite et de responsabilité dans chaque interaction commerciale." },
  { icon: CheckCircle2, en: 'Integrity', fr: 'Intégrité', descEn: 'Operating with honesty and ethical standards across all client, partner, and supplier relationships.', descFr: 'Agir avec honnêteté et rigueur éthique dans toutes les relations avec clients, partenaires et fournisseurs.' },
  { icon: Lightbulb, en: 'Innovation', fr: 'Innovation', descEn: 'Continuously adopting modern technologies and methodologies to deliver smarter logistics solutions.', descFr: 'Adopter continuellement les technologies et méthodologies modernes pour des solutions logistiques plus performantes.' },
  { icon: TrendingUp, en: 'Operational Excellence', fr: 'Excellence Opérationnelle', descEn: 'Relentless pursuit of efficiency, quality, and continuous improvement across all our operations.', descFr: "Recherche constante d'efficacité, de qualité et d'amélioration continue dans toutes nos opérations." },
  { icon: Globe2, en: 'Global Collaboration', fr: 'Collaboration Mondiale', descEn: 'Building strong international partnerships to connect businesses with global markets and opportunities.', descFr: 'Construire des partenariats internationaux solides pour connecter les entreprises aux marchés et opportunités mondiales.' },
];

export default function AboutPage() {
  const { L } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-sidebar py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&auto=format&fit=crop&q=50"
            alt="About hero" fill className="object-cover opacity-10" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-sidebar/80 to-sidebar/60" />
        </div>
        <motion.div variants={stagger} initial="hidden" animate="show"
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p variants={fadeInUp} className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{L({ en: 'About Us', fr: 'À Propos' })}</motion.p>
          <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-sidebar-foreground mb-6">{L({ en: 'Who We Are', fr: 'Qui Nous Sommes' })}</motion.h1>
          <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-sidebar-foreground/80 max-w-2xl mx-auto">
            {L({ en: 'A Cameroonian company with international reach — providing reliable logistics, transit, industrial supply, and global trade solutions across 30+ countries.', fr: "Une entreprise camerounaise à portée internationale — offrant des solutions fiables de logistique, transit, fourniture industrielle et commerce mondial dans plus de 30 pays." })}
          </motion.p>
        </motion.div>
      </section>

      {/* Company Overview */}
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeInLeft} initial="hidden" whileInView="show" viewport={viewportOnce}>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{L({ en: 'Our Story', fr: 'Notre Histoire' })}</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-6">{L({ en: 'Built for the Demands of Global Commerce', fr: 'Conçu pour les Exigences du Commerce Mondial' })}</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {L({ en: "LTIC — Logistics and Transit International Company — was incorporated in Douala, Cameroon as a SARL to serve a critical need: a reliable, comprehensive partner for logistics, transit, industrial supply, commercial representation, and international trade in Cameroon and abroad.", fr: "LTIC — Logistics and Transit International Company — a été constituée à Douala, Cameroun en SARL pour répondre à un besoin essentiel : un partenaire fiable et complet en logistique, transit, fourniture industrielle, représentation commerciale et commerce international au Cameroun et à l'étranger." })}
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {L({ en: 'From our registered headquarters in Douala, we operate across Africa, Europe, the Middle East, and Canada — delivering logistics, industrial supply, import/export facilitation, phytosanitary treatment, and strategic trade solutions with precision and reliability.', fr: "Depuis notre siège social à Douala, nous opérons en Afrique, Europe, Moyen-Orient et Canada — en livrant des solutions logistiques, de fourniture industrielle, de facilitation import/export, de traitement phytosanitaire et de commerce stratégique avec précision et fiabilité." })}
              </p>
              <ul className="space-y-3">
                {[
                  { en: 'Active operations in 30+ countries across Africa, Europe, Middle East & Americas', fr: "Opérations actives dans 30+ pays en Afrique, Europe, Moyen-Orient & Amériques" },
                  { en: 'Specialized in industrial supply chains, logistics, timber trade & consulting', fr: "Spécialisé dans les chaînes d'approvisionnement industrielles, logistique, commerce du bois" },
                  { en: 'Certified partnerships with Total, Shell and major OEM brands', fr: "Partenariats certifiés avec Total, Shell et grandes marques OEM" },
                  { en: 'Full compliance capabilities including phytosanitary treatment & documentation', fr: "Capacités de conformité complètes incluant traitement phytosanitaire et documentation" },
                ].map((item, i) => (
                  <motion.li key={i} variants={fadeInLeft} initial="hidden" whileInView="show" viewport={viewportOnce}
                    transition={{ delay: i * 0.08 }} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{L(item)}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeInRight} initial="hidden" whileInView="show" viewport={viewportOnce}
              className="relative h-96 lg:h-full min-h-[400px] rounded-2xl overflow-hidden group">
              <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=70"
                alt="LTIC SARL operations" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="bg-muted/40 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{L({ en: 'Mission, Vision & Values', fr: 'Mission, Vision & Valeurs' })}</h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewportOnce} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: { en: 'Mission', fr: 'Mission' }, desc: { en: 'To deliver reliable, efficient, and comprehensive logistics, industrial supply, and trade solutions that empower our clients to compete successfully in global markets.', fr: "Fournir des solutions logistiques, de fournitures industrielles et commerciales fiables, efficaces et complètes qui permettent à nos clients de réussir sur les marchés mondiaux." } },
              { icon: Globe2, title: { en: 'Vision', fr: 'Vision' }, desc: { en: 'To become a globally recognized logistics, transit, and industrial solutions company — trusted by businesses across Africa, Europe, the Middle East, Canada, and beyond.', fr: "Devenir une entreprise de logistique, transit et solutions industrielles reconnue à l'échelle mondiale — de confiance pour les entreprises en Afrique, Europe, Moyen-Orient, Canada et au-delà." } },
              { icon: ShieldCheck, title: { en: 'Values', fr: 'Valeurs' }, desc: { en: 'Professionalism, Reliability, Integrity, Customer Satisfaction, Operational Excellence, Innovation, Global Collaboration, Efficiency', fr: 'Professionnalisme, Fiabilité, Intégrité, Satisfaction Client, Excellence Opérationnelle, Innovation, Collaboration Mondiale, Efficacité' } },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div key={title.en} variants={fadeInUp}
                whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.12)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-card border rounded-2xl p-5 sm:p-6 lg:p-8 hover:border-primary/40 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-4">{L(title)}</h3>
                <p className="text-muted-foreground leading-relaxed">{L(desc)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="text-center mb-8 sm:mb-12 lg:mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{L({ en: 'What Drives Us', fr: 'Ce Qui Nous Anime' })}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{L({ en: 'Our Core Values', fr: 'Nos Valeurs Fondamentales' })}</h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewportOnce} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map(({ icon: Icon, ...val }) => (
              <motion.div key={val.en} variants={scaleIn}
                whileHover={{ y: -5, boxShadow: '0 16px 32px -8px rgba(0,0,0,0.12)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-card border rounded-2xl p-5 sm:p-6 lg:p-8 hover:border-primary/40 transition-colors group">
                <motion.div whileHover={{ rotate: 8, scale: 1.1 }} transition={{ type: 'spring', stiffness: 400 }}
                  className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-6 w-6" />
                </motion.div>
                <h3 className="text-lg font-bold mb-3">{L({ en: val.en, fr: val.fr })}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{L({ en: val.descEn, fr: val.descFr })}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-sidebar py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerFast} initial="hidden" whileInView="show" viewport={viewportOnce}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[{ value: '30+', en: 'Countries', fr: 'Pays' }, { value: '500+', en: 'Clients', fr: 'Clients' }, { value: '5+', en: 'Years', fr: 'Années' }, { value: '10K+', en: 'Shipments', fr: 'Expéditions' }].map((stat) => (
              <motion.div key={stat.value} variants={scaleIn}>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sidebar-foreground/80 text-sm font-medium uppercase tracking-wider">{L(stat)}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team / Leadership */}
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="text-center mb-8 sm:mb-12 lg:mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{L({ en: 'Our Team', fr: 'Notre Équipe' })}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">{L({ en: 'Professional Expertise at Every Level', fr: 'Expertise Professionnelle à Chaque Niveau' })}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {L({ en: 'Our team combines deep expertise across logistics, international trade, industrial supply, and strategic consulting — ensuring every client receives world-class service.', fr: "Notre équipe combine une expertise approfondie en logistique, commerce international, fournitures industrielles et conseil stratégique — garantissant un service de classe mondiale à chaque client." })}
            </p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewportOnce}
            className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { role: { en: 'Operations Director', fr: 'Directeur des Opérations' }, desc: { en: 'Experienced in managing international freight, customs operations, and multi-modal logistics across Africa, Europe, and the Middle East.', fr: "Expérimenté dans la gestion du fret international, des opérations douanières et de la logistique multimodale en Afrique, Europe et Moyen-Orient." } },
              { role: { en: 'Trade Manager', fr: 'Responsable Commercial' }, desc: { en: 'Specialist in global sourcing, import/export compliance, and building strategic trade partnerships across 30+ markets.', fr: "Spécialiste en approvisionnement mondial, conformité import/export, et développement de partenariats commerciaux stratégiques dans 30+ marchés." } },
              { role: { en: 'Supply Chain Consultant', fr: 'Consultant en Chaîne Logistique' }, desc: { en: 'Expert in supply chain design, procurement optimization, and industrial supply solutions for complex operational environments.', fr: "Expert en conception de chaîne logistique, optimisation des achats et solutions de fournitures industrielles pour environnements complexes." } },
            ].map((member, i) => (
              <motion.div key={i} variants={scaleIn}
                whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.12)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-card border rounded-2xl p-5 sm:p-6 lg:p-8 text-center hover:border-primary/40 transition-colors">
                <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                  <User className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold mb-3">{L(member.role)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{L(member.desc)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 6 }}
          className="absolute right-10 top-10 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewportOnce}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary-foreground mb-4">
            {L({ en: 'Ready to Partner with LTIC SARL?', fr: 'Prêt à Collaborer avec LTIC SARL ?' })}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-primary-foreground/80 mb-10 max-w-xl mx-auto">
            {L({ en: 'Let us show you how our global network and expertise can transform your operations.', fr: "Laissez-nous vous montrer comment notre réseau mondial et notre expertise peuvent transformer vos opérations." })}
          </motion.p>
          <motion.div variants={staggerFast} className="flex flex-wrap gap-4 justify-center">
            <motion.div variants={scaleIn} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg font-semibold">
                <Link href="/contact">{L({ en: 'Contact Our Team', fr: 'Contacter Notre Équipe' })}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}


