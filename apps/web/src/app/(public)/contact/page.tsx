'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Clock, Globe2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/api';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
});
type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const { L } = useLanguage();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/api/contacts', data);
      toast.success(L({ en: 'Message Sent', fr: 'Message Envoyé' }), {
        description: L({ en: 'Thank you for reaching out. We will respond shortly.', fr: 'Merci de nous avoir contactés. Nous répondrons sous peu.' }),
      });
      reset();
    } catch {
      toast.error(L({ en: 'Error', fr: 'Erreur' }), {
        description: L({ en: 'There was a problem sending your message. Please try again.', fr: 'Un problème est survenu. Veuillez réessayer.' }),
      });
    }
  };

  const contactInfo = [
    { icon: MapPin, label: { en: 'Address', fr: 'Adresse' }, value: 'Douala, Cameroon / International Operations' },
    { icon: Phone, label: { en: 'Phone', fr: 'Téléphone' }, value: '+237 6XX XXX XXX' },
    { icon: Mail, label: { en: 'Email', fr: 'Email' }, value: 'contact@lticsarl.com' },
    { icon: Clock, label: { en: 'Hours', fr: 'Horaires' }, value: 'Monday – Friday, 8:00 AM – 6:00 PM (WAT)' },
    { icon: Globe2, label: { en: 'Coverage', fr: 'Couverture' }, value: L({ en: 'Global operations — 30+ countries served', fr: 'Opérations mondiales — 30+ pays desservis' }) },
  ];

  return (
    <>
      <section className="relative bg-sidebar py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&auto=format&fit=crop&q=50" alt="Contact" fill className="object-cover opacity-10" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{L({ en: 'Get In Touch', fr: 'Prendre Contact' })}</p>
          <h1 className="text-5xl font-bold tracking-tight text-sidebar-foreground mb-6">{L({ en: 'Contact Our Team', fr: 'Contactez Notre Équipe' })}</h1>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold mb-6">{L({ en: 'Contact Information', fr: 'Informations de Contact' })}</h2>
              <div className="space-y-5">
                {contactInfo.map(({ icon: Icon, label, value }) => (
                  <div key={label.en} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{L(label)}</p>
                      <p className="font-medium text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-card border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">{L({ en: 'Send Us a Message', fr: 'Envoyez-Nous un Message' })}</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{L({ en: 'Your Name', fr: 'Votre Nom' })} *</Label>
                    <Input id="name" {...register('name')} className="mt-1" />
                    {errors.name && <p className="text-destructive text-xs mt-1">{L({ en: 'Min 2 characters required', fr: 'Minimum 2 caractères requis' })}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">{L({ en: 'Email Address', fr: 'Adresse Email' })} *</Label>
                    <Input id="email" type="email" {...register('email')} className="mt-1" />
                    {errors.email && <p className="text-destructive text-xs mt-1">{L({ en: 'Valid email required', fr: 'Email valide requis' })}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">{L({ en: 'Phone Number', fr: 'Numéro de Téléphone' })}</Label>
                    <Input id="phone" {...register('phone')} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="company">{L({ en: 'Company Name', fr: 'Nom de l\'Entreprise' })}</Label>
                    <Input id="company" {...register('company')} className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">{L({ en: 'Subject', fr: 'Sujet' })} *</Label>
                  <Input id="subject" {...register('subject')} className="mt-1" />
                  {errors.subject && <p className="text-destructive text-xs mt-1">{L({ en: 'Required', fr: 'Requis' })}</p>}
                </div>
                <div>
                  <Label htmlFor="message">{L({ en: 'Your Message', fr: 'Votre Message' })} *</Label>
                  <Textarea id="message" {...register('message')} rows={5} className="mt-1" />
                  {errors.message && <p className="text-destructive text-xs mt-1">{L({ en: 'Min 10 characters required', fr: 'Minimum 10 caractères requis' })}</p>}
                </div>
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                  {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {L({ en: 'Send Message', fr: 'Envoyer le Message' })}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
