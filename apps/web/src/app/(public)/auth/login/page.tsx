'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, Mail, Lock, User } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCustomer } from '@/contexts/CustomerContext';
import { checkAuth } from '@/lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function LoginPage() {
  const { L } = useLanguage();
  const { refreshProfile } = useCustomer();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // If already authenticated, skip the form
  useEffect(() => {
    const adminToken = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    const customerToken = typeof window !== 'undefined' ? localStorage.getItem('customer_token') : null;

    if (adminToken) {
      checkAuth()
        .then((res) => {
          if (res.authenticated) router.replace(redirect || '/admin/dashboard');
          else setChecking(false);
        })
        .catch(() => setChecking(false));
    } else if (customerToken) {
      router.replace(redirect || '/account');
    } else {
      setChecking(false);
    }
  }, [router, redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || L({ en: 'Invalid email or password', fr: 'Email ou mot de passe incorrect' }));
      }

      const data: { role: string; token: string; user: { name: string; email: string } } = await res.json();

      if (data.role === 'admin') {
        localStorage.setItem('admin_token', data.token);
        toast.success(L({ en: `Welcome, ${data.user.name}!`, fr: `Bienvenue, ${data.user.name} !` }));
        router.push(redirect || '/admin/dashboard');
      } else {
        localStorage.setItem('customer_token', data.token);
        await refreshProfile();
        toast.success(L({ en: `Welcome back, ${data.user.name}!`, fr: `Bon retour, ${data.user.name} !` }));
        router.push(redirect || '/account');
      }
    } catch (err: any) {
      toast.error(err.message || L({ en: 'Login failed', fr: 'Échec de connexion' }));
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold">{L({ en: 'Sign In', fr: 'Connexion' })}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {L({ en: 'Access your LTIC SARL account', fr: 'Accédez à votre compte LTIC SARL' })}
          </p>
        </div>

        <div className="bg-card border rounded-2xl p-8 shadow-sm">
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

            <div className="space-y-1.5">
              <Label htmlFor="password">{L({ en: 'Password', fr: 'Mot de passe' })}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{L({ en: 'Signing in…', fr: 'Connexion…' })}</>
              ) : (
                L({ en: 'Sign In', fr: 'Se connecter' })
              )}
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-3.5 w-3.5 flex-shrink-0" />
              <span>{L({ en: 'Customers: use your registered email and password.', fr: 'Clients : utilisez votre e-mail et mot de passe.' })}</span>
            </div>
          </div>

          <div className="mt-5 text-center text-sm text-muted-foreground">
            {L({ en: "Don't have an account?", fr: "Pas encore de compte?" })}{' '}
            <Link href="/auth/register" className="text-primary font-medium hover:underline">
              {L({ en: 'Create one', fr: "S'inscrire" })}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

