'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Clock, Shield, Globe2, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/api';
import { Suspense } from 'react';

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
  const { L } = useLanguage();
  const searchParams = useSearchParams();
  const defaultProduct = searchParams.get('product') || '';

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { productInterest: defaultProduct },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/api/quotes', data);
      toast.success(L({ en: 'Quote Request Sent', fr: 'Demande de Devis Envoyée' }), {
        description: L({ en: 'We have received your request and will respond within 24 hours.', fr: 'Nous avons reçu votre demande et répondrons dans les 24 heures.' }),
      });
      reset();
    } catch {
      toast.error(L({ en: 'Error', fr: 'Erreur' }), {
        description: L({ en: 'There was a problem sending your request.', fr: 'Un problème est survenu lors de l\'envoi de votre demande.' }),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="companyName">{L({ en: 'Company Name', fr: 'Nom de l\'Entreprise' })} *</Label>
          <Input id="companyName" {...register('companyName')} className="mt-1" />
          {errors.companyName && <p className="text-destructive text-xs mt-1">{L({ en: 'Required', fr: 'Requis' })}</p>}
        </div>
        <div>
          <Label htmlFor="contactName">{L({ en: 'Contact Name', fr: 'Nom du Contact' })} *</Label>
          <Input id="contactName" {...register('contactName')} className="mt-1" />
          {errors.contactName && <p className="text-destructive text-xs mt-1">{L({ en: 'Required', fr: 'Requis' })}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">{L({ en: 'Email Address', fr: 'Adresse Email' })} *</Label>
          <Input id="email" type="email" {...register('email')} className="mt-1" />
          {errors.email && <p className="text-destructive text-xs mt-1">{L({ en: 'Valid email required', fr: 'Email valide requis' })}</p>}
        </div>
        <div>
          <Label htmlFor="phone">{L({ en: 'Phone Number', fr: 'Numéro de Téléphone' })}</Label>
          <Input id="phone" {...register('phone')} className="mt-1" />
        </div>
      </div>
      <div>
        <Label htmlFor="country">{L({ en: 'Country', fr: 'Pays' })}</Label>
        <Input id="country" {...register('country')} className="mt-1" />
      </div>
      <div>
        <Label htmlFor="productInterest">{L({ en: 'Product / Service of Interest', fr: 'Produit / Service d\'Intérêt' })} *</Label>
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
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
        {L({ en: 'Submit Quote Request', fr: 'Envoyer la Demande de Devis' })}
      </Button>
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
      <section className="relative bg-sidebar py-16 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-sidebar-foreground mb-4">{L({ en: 'Request a Quote', fr: 'Demander un Devis' })}</h1>
          <p className="text-xl text-sidebar-foreground/80 max-w-2xl mx-auto">
            {L({ en: 'Get a tailored quote for any logistics, industrial supply, or trade requirement.', fr: 'Obtenez un devis personnalisé pour tout besoin logistique, fourniture industrielle ou commercial.' })}
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map(({ icon: Icon, en, fr }) => (
                <div key={en} className="bg-card border rounded-xl p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-medium text-sm leading-relaxed pt-1.5">{L({ en, fr })}</p>
                </div>
              ))}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mt-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {L({ en: 'Our team of specialists will review your requirements and provide a comprehensive, customized quote with competitive pricing and delivery timelines.', fr: 'Notre équipe de spécialistes examinera vos besoins et fournira un devis complet et personnalisé avec des prix compétitifs et des délais de livraison.' })}
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-card border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">{L({ en: 'Your Quote Details', fr: 'Détails de Votre Devis' })}</h2>
              <Suspense>
                <QuoteForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
