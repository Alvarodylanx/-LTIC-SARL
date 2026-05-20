'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Clock, Shield, Globe2, CheckCircle2, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { EmailInput } from '@/components/ui/EmailInput';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { CountrySelect } from '@/components/ui/CountrySelect';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/api';
import { Suspense } from 'react';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, stagger, viewportOnce } from '@/components/motion/variants';

const schema = z.object({
  companyName: z.string().min(1),
  contactName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().optional(),
  productInterest: z.string().min(1),
  quantity: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function QuoteForm() {
  const { L, language } = useLanguage();
  const searchParams = useSearchParams();
  const defaultProduct = searchParams.get('product') || '';

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { productInterest: defaultProduct, country: '', phone: '' },
  });

  const selectedCountry = watch('country');

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/api/quotes', data);
      toast.success(L({ en: 'Quote Request Sent', fr: 'Demande de Devis Envoyée' }), {
        description: L({ en: 'We have received your request and will respond within 24 hours.', fr: 'Nous avons reçu votre demande et répondrons dans les 24 heures.' }),
      });
      reset();
    } catch {
      toast.error(L({ en: 'Error', fr: 'Erreur' }), {
        description: L({ en: 'There was a problem sending your request.', fr: "Un problème est survenu lors de l'envoi de votre demande." }),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="companyName">{L({ en: "Company Name", fr: "Nom de l'Entreprise" })} *</Label>
          <Input id="companyName" {...register('companyName')} className="mt-1" />
          {errors.companyName && <p className="text-destructive text-xs mt-1">{L({ en: 'Required', fr: 'Requis' })}</p>}
        </div>
        <div>
          <Label htmlFor="contactName">{L({ en: 'Contact Name', fr: 'Nom du Contact' })} *</Label>
          <Input id="contactName" {...register('contactName')} className="mt-1" />
          {errors.contactName && <p className="text-destructive text-xs mt-1">{L({ en: 'Required', fr: 'Requis' })}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email">{L({ en: 'Email Address', fr: 'Adresse Email' })} *</Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <EmailInput
              id="email"
              placeholder="you@company.com"
              className="mt-1"
              {...field}
            />
          )}
        />
        {errors.email && <p className="text-destructive text-xs mt-1">{L({ en: 'Valid email required', fr: 'Email valide requis' })}</p>}
      </div>

      {/* Country */}
      <div>
        <Label htmlFor="country">{L({ en: 'Country', fr: 'Pays' })}</Label>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <CountrySelect
              id="country"
              className="mt-1"
              value={field.value ?? ''}
              onChange={field.onChange}
              lang={language}
              placeholderEn="Select your country…"
              placeholderFr="Sélectionnez votre pays…"
            />
          )}
        />
      </div>

      {/* Phone — dial code synced with country */}
      <div>
        <Label htmlFor="phone">{L({ en: 'Phone Number', fr: 'Numéro de Téléphone' })}</Label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              id="phone"
              value={field.value}
              onChange={field.onChange}
              syncCountry={selectedCountry}
              className="mt-1"
            />
          )}
        />
      </div>

      <div>
        <Label htmlFor="productInterest">{L({ en: "Product / Service of Interest", fr: "Produit / Service d'Intérêt" })} *</Label>
        <Input id="productInterest" {...register('productInterest')} className="mt-1" />
        {errors.productInterest && <p className="text-destructive text-xs mt-1">{L({ en: 'Required', fr: 'Requis' })}</p>}
      </div>
      <div>
        <Label htmlFor="quantity">{L({ en: 'Quantity / Volume', fr: 'Quantité / Volume' })}</Label>
        <Input id="quantity" {...register('quantity')} className="mt-1" />
      </div>
      <div>
        <Label htmlFor="message">{L({ en: 'Additional Information', fr: 'Informations Supplémentaires' })}</Label>
        <Textarea id="message" {...register('message')} rows={4} className="mt-1" />
      </div>
      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full shadow-sm">
          {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
          {L({ en: 'Submit Quote Request', fr: 'Envoyer la Demande de Devis' })}
        </Button>
      </motion.div>
    </form>
  );
}

export default function QuotePage() {
  const { L } = useLanguage();

  const highlights = [
    { icon: Clock, en: 'Response within 24 hours', fr: 'Réponse dans les 24 heures' },
    { icon: Shield, en: 'Confidential & secure', fr: 'Confidentiel & sécurisé' },
    { icon: Globe2, en: 'Global coverage — 30+ countries', fr: 'Couverture mondiale — 30+ pays' },
    { icon: CheckCircle2, en: 'Tailored to your requirements', fr: 'Adapté à vos besoins' },
  ];

  return (
    <>
      <section className="relative bg-sidebar py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&auto=format&fit=crop&q=50"
            alt="Quote" fill className="object-cover opacity-10" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-sidebar/70 to-sidebar/80" />
        </div>
        <motion.div variants={stagger} initial="hidden" animate="show"
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p variants={fadeInUp} className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            {L({ en: 'Get a Quote', fr: 'Obtenir un Devis' })}
          </motion.p>
          <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-sidebar-foreground mb-4">
            {L({ en: 'Request a Quote', fr: 'Demander un Devis' })}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-sidebar-foreground/80 max-w-2xl mx-auto">
            {L({ en: 'Get a tailored quote for any logistics, industrial supply, or trade requirement.', fr: 'Obtenez un devis personnalisé pour tout besoin logistique, fourniture industrielle ou commercial.' })}
          </motion.p>
        </motion.div>
      </section>

      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Highlights */}
            <motion.div variants={fadeInLeft} initial="hidden" whileInView="show" viewport={viewportOnce}
              className="space-y-4">
              {highlights.map(({ icon: Icon, en, fr }, i) => (
                <motion.div key={en} variants={fadeInLeft} initial="hidden" whileInView="show" viewport={viewportOnce}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: 4 }} className="bg-card border rounded-xl p-6 flex items-start gap-4 group">
                  <motion.div whileHover={{ scale: 1.15, rotate: 8 }} transition={{ type: 'spring', stiffness: 400 }}
                    className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  <p className="font-medium text-sm leading-relaxed pt-1.5">{L({ en, fr })}</p>
                </motion.div>
              ))}
              <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={viewportOnce}
                className="bg-primary/5 border border-primary/20 rounded-xl p-6 mt-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {L({ en: 'Our team of specialists will review your requirements and provide a comprehensive, customized quote with competitive pricing and delivery timelines.', fr: 'Notre équipe de spécialistes examinera vos besoins et fournira un devis complet et personnalisé avec des prix compétitifs et des délais de livraison.' })}
                </p>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div variants={fadeInRight} initial="hidden" whileInView="show" viewport={viewportOnce}
              className="lg:col-span-2 bg-card border rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">{L({ en: 'Your Quote Details', fr: 'Détails de Votre Devis' })}</h2>
              <Suspense>
                <QuoteForm />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}


