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
import { useLanguage } from '@/contexts/LanguageContext';
import { useCustomer } from '@/contexts/CustomerContext';

export default function LoginPage() {
  const { L } = useLanguage();
  const { login } = useCustomer();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success(L({ en: 'Welcome back!', fr: 'Bon retour!' }));
      router.push('/account');
    } catch (err: any) {
      toast.error(err.message || L({ en: 'Login failed', fr: 'Échec de connexion' }));
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
          <h1 className="text-2xl font-bold">{L({ en: 'Sign In', fr: 'Connexion' })}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {L({ en: 'Access your LTIC SARL account', fr: 'Accédez à votre compte LTIC SARL' })}
          </p>
        </div>

        <div className="bg-card border rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email">{L({ en: 'Email Address', fr: 'Adresse e-mail' })}</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">{L({ en: 'Password', fr: 'Mot de passe' })}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{L({ en: 'Signing in...', fr: 'Connexion...' })}</>
              ) : (
                L({ en: 'Sign In', fr: 'Se connecter' })
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
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
