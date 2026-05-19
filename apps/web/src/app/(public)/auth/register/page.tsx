'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EmailInput } from '@/components/ui/EmailInput';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { CountrySelect } from '@/components/ui/CountrySelect';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCustomer } from '@/contexts/CustomerContext';

export default function RegisterPage() {
  const { L, language } = useLanguage();
  const { register } = useCustomer();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    country: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailValid) {
      toast.error(L({ en: 'Please enter a valid email address', fr: 'Veuillez saisir une adresse e-mail valide' }));
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error(L({ en: 'Passwords do not match', fr: 'Les mots de passe ne correspondent pas' }));
      return;
    }
    if (form.password.length < 6) {
      toast.error(L({ en: 'Password must be at least 6 characters', fr: 'Le mot de passe doit comporter au moins 6 caractères' }));
      return;
    }

    setLoading(true);
    try {
      await register({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        phone: form.phone || undefined,
        country: form.country || undefined,
      });
      toast.success(L({ en: 'Account created successfully!', fr: 'Compte créé avec succès!' }));
      router.push('/account');
    } catch (err: any) {
      toast.error(err.message || L({ en: 'Registration failed', fr: "Échec de l'inscription" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-lg">LT</span>
          </div>
          <h1 className="text-2xl font-bold">{L({ en: 'Create Account', fr: 'Créer un compte' })}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {L({ en: 'Join LTIC SARL and manage your shipments', fr: 'Rejoignez LTIC SARL et gérez vos expéditions' })}
          </p>
        </div>

        <div className="bg-card border rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="fullName">{L({ en: 'Full Name', fr: 'Nom complet' })} *</Label>
              <Input
                id="fullName"
                placeholder={L({ en: 'Jean Dupont', fr: 'Jean Dupont' })}
                value={form.fullName}
                onChange={set('fullName')}
                required
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email">{L({ en: 'Email Address', fr: 'Adresse e-mail' })} *</Label>
              <EmailInput
                id="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={set('email')}
                onValidityChange={setEmailValid}
                required
                autoComplete="email"
              />
            </div>

            {/* Country */}
            <div className="space-y-1.5">
              <Label htmlFor="country">{L({ en: 'Country', fr: 'Pays' })}</Label>
              <CountrySelect
                id="country"
                value={form.country}
                onChange={v => setForm(prev => ({ ...prev, country: v }))}
                lang={language}
                placeholderEn="Select your country…"
                placeholderFr="Sélectionnez votre pays…"
              />
            </div>

            {/* Phone — syncs dial code with selected country */}
            <div className="space-y-1.5">
              <Label htmlFor="phone">{L({ en: 'Phone Number', fr: 'Numéro de téléphone' })}</Label>
              <PhoneInput
                id="phone"
                value={form.phone}
                onChange={v => setForm(prev => ({ ...prev, phone: v }))}
                syncCountry={form.country}
              />
              <p className="text-xs text-muted-foreground">
                {L({ en: 'Dial code is set from your country selection.', fr: 'L\'indicatif est défini par le pays sélectionné.' })}
              </p>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password">{L({ en: 'Password', fr: 'Mot de passe' })} *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={set('password')}
                  required
                  autoComplete="new-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">{L({ en: 'Confirm Password', fr: 'Confirmer le mot de passe' })} *</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={set('confirmPassword')}
                required
                autoComplete="new-password"
              />
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-destructive text-xs">
                  {L({ en: 'Passwords do not match', fr: 'Les mots de passe ne correspondent pas' })}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{L({ en: 'Creating account…', fr: 'Création…' })}</>
              ) : (
                L({ en: 'Create Account', fr: 'Créer le compte' })
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {L({ en: 'Already have an account?', fr: 'Vous avez déjà un compte?' })}{' '}
            <Link href="/auth/login" className="text-primary font-medium hover:underline">
              {L({ en: 'Sign In', fr: 'Connexion' })}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
