'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function ForgotPasswordPage() {
  const { L } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: email.trim() }),
      });
      setSent(true);
    } catch {
      toast.error(L({ en: 'Something went wrong. Please try again.', fr: 'Une erreur est survenue. Veuillez réessayer.' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-xl">LT</span>
          </div>
          <h1 className="text-2xl font-bold">{L({ en: 'Reset Password', fr: 'Réinitialiser le mot de passe' })}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {L({ en: "Enter your email and we'll send you a reset link.", fr: 'Entrez votre e-mail et nous vous enverrons un lien de réinitialisation.' })}
          </p>
        </div>

        <div className="bg-card border rounded-2xl p-8 shadow-sm">
          {sent ? (
            <div className="text-center space-y-4">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
              <h2 className="font-semibold text-lg">
                {L({ en: 'Check your inbox', fr: 'Consultez votre boîte mail' })}
              </h2>
              <p className="text-sm text-muted-foreground">
                {L({
                  en: 'If an account with that email exists, we sent a password reset link. It expires in 1 hour.',
                  fr: "Si un compte avec cet e-mail existe, nous avons envoyé un lien de réinitialisation. Il expire dans 1 heure.",
                })}
              </p>
              <Button asChild variant="outline" className="w-full mt-2">
                <Link href="/auth/login">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {L({ en: 'Back to Sign In', fr: 'Retour à la connexion' })}
                </Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email">{L({ en: 'Email Address', fr: 'Adresse e-mail' })}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="pl-9"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{L({ en: 'Sending…', fr: 'Envoi…' })}</>
                ) : (
                  L({ en: 'Send Reset Link', fr: 'Envoyer le lien' })
                )}
              </Button>

              <div className="text-center">
                <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  {L({ en: 'Back to Sign In', fr: 'Retour à la connexion' })}
                </Link>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
