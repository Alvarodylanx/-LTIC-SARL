'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Clock, Globe2, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { EmailInput } from '@/components/ui/EmailInput';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { CountrySelect } from '@/components/ui/CountrySelect';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/api';
import { fadeInUp, fadeInLeft, fadeInRight, stagger, viewportOnce } from '@/components/motion/variants';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
});
type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const { L, language } = useLanguage();
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { country: '', phone: '' },
  });

  const selectedCountry = watch('country');

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/api/contacts', data);
      toast.success(L({ en: 'Message Sent!', fr: 'Message Envoyé !' }), {
        description: L({ en: 'Thank you for reaching out. We will respond shortly.', fr: 'Merci de nous avoir contactés. Nous répondrons sous peu.' }),
      });
      reset();
    } catch {
      toast.error(L({ en: 'Something went wrong', fr: 'Une erreur est survenue' }), {
        description: L({ en: 'Please try again or email us directly.', fr: 'Veuillez réessayer ou nous écrire directement.' }),
      });
    }
  };

  const contactInfo = [
    { icon: MapPin, label: { en: 'Address', fr: 'Adresse' }, value: 'Douala, Cameroon / International Operations' },
    { icon: Phone, label: { en: 'Phone', fr: 'Téléphone' }, value: '+237 6XX XXX XXX' },
    { icon: Mail, label: { en: 'Email', fr: 'Email' }, value: 'contact@lticsarl.com' },
    { icon: Clock, label: { en: 'Hours', fr: 'Horaires' }, value: 'Monday – Friday, 8:00 AM – 6:00 PM (WAT)' },
    { icon: Globe2, label: { en: 'Coverage', fr: 'Couverture' }, value: L({ en: 'Global — 30+ countries served', fr: 'Mondial — 30+ pays desservis' }) },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-sidebar py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&auto=format&fit=crop&q=50"
            alt="Contact" fill className="object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-sidebar/70 to-sidebar" />
        </div>
        <motion.div variants={stagger} initial="hidden" animate="show"
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p variants={fadeInUp} className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{L({ en: 'Get In Touch', fr: 'Prendre Contact' })}</motion.p>
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold tracking-tight text-sidebar-foreground mb-6">{L({ en: 'Contact Our Team', fr: 'Contactez Notre Équipe' })}</motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-sidebar-foreground/80 max-w-xl mx-auto">
            {L({ en: 'Our experts are ready to discuss your logistics and supply needs.', fr: 'Nos experts sont prêts à discuter de vos besoins en logistique et fournitures.' })}
          </motion.p>
        </motion.div>
      </section>

      <section className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <motion.div variants={fadeInLeft} initial="hidden" whileInView="show" viewport={viewportOnce}>
              <h2 className="text-2xl font-bold mb-8">{L({ en: 'Contact Information', fr: 'Informations de Contact' })}</h2>
              <div className="space-y-5">
                {contactInfo.map(({ icon: Icon, label, value }, i) => (
                  <motion.div key={label.en} variants={fadeInLeft} initial="hidden" whileInView="show" viewport={viewportOnce}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-4 group">
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: 'spring', stiffness: 400 }}
                      className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-5 w-5" />
                    </motion.div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{L(label)}</p>
                      <p className="font-medium text-sm">{value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div variants={fadeInRight} initial="hidden" whileInView="show" viewport={viewportOnce}
              className="lg:col-span-2 bg-card border rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">{L({ en: 'Send Us a Message', fr: 'Envoyez-Nous un Message' })}</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{L({ en: 'Your Name', fr: 'Votre Nom' })} *</Label>
                    <Input id="name" {...register('name')} className="mt-1.5" placeholder={L({ en: 'John Doe', fr: 'Jean Dupont' })} />
                    {errors.name && <p className="text-destructive text-xs mt-1">{L({ en: 'Min 2 characters required', fr: 'Minimum 2 caractères requis' })}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">{L({ en: 'Email Address', fr: 'Adresse Email' })} *</Label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <EmailInput
                          id="email"
                          placeholder="you@company.com"
                          className="mt-1.5"
                          {...field}
                        />
                      )}
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1">{L({ en: 'Valid email required', fr: 'Email valide requis' })}</p>}
                  </div>
                </div>

                {/* Country + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">{L({ en: 'Country', fr: 'Pays' })}</Label>
                    <Controller
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <CountrySelect
                          id="country"
                          className="mt-1.5"
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          lang={language}
                          placeholderEn="Select country…"
                          placeholderFr="Sélectionnez votre pays…"
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">{L({ en: 'Company Name', fr: "Nom de l'Entreprise" })}</Label>
                    <Input id="company" {...register('company')} className="mt-1.5" placeholder={L({ en: 'Your Company Ltd.', fr: 'Votre Société S.A.' })} />
                  </div>
                </div>

                {/* Phone — dial code syncs with country */}
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
                        className="mt-1.5"
                      />
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="subject">{L({ en: 'Subject', fr: 'Sujet' })} *</Label>
                  <Input id="subject" {...register('subject')} className="mt-1.5" placeholder={L({ en: 'How can we help?', fr: 'Comment pouvons-nous vous aider ?' })} />
                  {errors.subject && <p className="text-destructive text-xs mt-1">{L({ en: 'Required', fr: 'Requis' })}</p>}
                </div>
                <div>
                  <Label htmlFor="message">{L({ en: 'Your Message', fr: 'Votre Message' })} *</Label>
                  <Textarea id="message" {...register('message')} rows={5} className="mt-1.5" placeholder={L({ en: 'Tell us about your logistics or supply requirements…', fr: 'Parlez-nous de vos besoins en logistique ou fournitures…' })} />
                  {errors.message && <p className="text-destructive text-xs mt-1">{L({ en: 'Min 10 characters required', fr: 'Minimum 10 caractères requis' })}</p>}
                </div>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full shadow-sm">
                    {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                    {L({ en: 'Send Message', fr: 'Envoyer le Message' })}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
