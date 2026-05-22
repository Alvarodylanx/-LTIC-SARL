'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

function ResetPasswordForm() {
  const { L } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  if (!token) {
    return (
      <div className="text-center space-y-4">
        <p className="text-muted-foreground text-sm">
          {L({ en: 'Invalid or missing reset token.', fr: 'Jeton de réinitialisation invalide ou manquant.' })}
        </p>
        <Button asChild variant="outline">
          <Link href="/auth/forgot-password">
            {L({ en: 'Request a new link', fr: 'Demander un nouveau lien' })}
          </Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error(L({ en: 'Password must be at least 8 characters.', fr: 'Le mot de passe doit comporter au moins 8 caractères.' }));
      return;
    }
    if (password !== confirm) {
      toast.error(L({ en: 'Passwords do not match.', fr: 'Les mots de passe ne correspondent pas.' }));
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ token, newPassword: password }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || L({ en: 'Reset failed', fr: 'Échec de la réinitialisation' }));
      }
      setDone(true);
      setTimeout(() => router.push('/auth/login'), 3000);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="text-center space-y-4">
        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
        <h2 className="font-semibold text-lg">{L({ en: 'Password updated!', fr: 'Mot de passe mis à jour !' })}</h2>
        <p className="text-sm text-muted-foreground">
          {L({ en: 'Redirecting you to sign in…', fr: 'Redirection vers la connexion…' })}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="password">{L({ en: 'New Password', fr: 'Nouveau mot de passe' })}</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
            className="pl-9 pr-10"
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

      <div className="space-y-1.5">
        <Label htmlFor="confirm">{L({ en: 'Confirm Password', fr: 'Confirmer le mot de passe' })}</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirm"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            autoComplete="new-password"
            className="pl-9"
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{L({ en: 'Updating…', fr: 'Mise à jour…' })}</>
        ) : (
          L({ en: 'Set New Password', fr: 'Définir le nouveau mot de passe' })
        )}
      </Button>

      <div className="text-center">
        <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          {L({ en: 'Back to Sign In', fr: 'Retour à la connexion' })}
        </Link>
      </div>
    </form>
  );
}

export default function ResetPasswordPage() {
  const { L } = useLanguage();

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
          <h1 className="text-2xl font-bold">{L({ en: 'Set New Password', fr: 'Nouveau mot de passe' })}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {L({ en: 'Choose a strong password for your account.', fr: 'Choisissez un mot de passe fort pour votre compte.' })}
          </p>
        </div>

        <div className="bg-card border rounded-2xl p-8 shadow-sm">
          <Suspense fallback={<div className="h-32 flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </motion.div>
    </div>
  );
}
