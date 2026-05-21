'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCustomer } from '@/contexts/CustomerContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

function VerifyEmailContent() {
  const { L } = useLanguage();
  const { refreshProfile } = useCustomer();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setErrorMsg(L({ en: 'No verification token provided.', fr: 'Aucun jeton de vérification fourni.' }));
      return;
    }
    fetch(`${API_URL}/api/customers/verify?token=${encodeURIComponent(token)}`, { credentials: 'include' })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || L({ en: 'Verification failed', fr: 'Échec de la vérification' }));
        }
        setStatus('success');
        refreshProfile().catch(() => {});
      })
      .catch((err) => {
        setStatus('error');
        setErrorMsg(err.message);
      });
  }, [token]);

  return (
    <div className="text-center space-y-4">
      {status === 'loading' && (
        <>
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">{L({ en: 'Verifying your email…', fr: 'Vérification de votre e-mail…' })}</p>
        </>
      )}
      {status === 'success' && (
        <>
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
          <h2 className="font-semibold text-lg">{L({ en: 'Email verified!', fr: 'E-mail vérifié !' })}</h2>
          <p className="text-sm text-muted-foreground">
            {L({ en: 'Your account is now fully active.', fr: 'Votre compte est maintenant entièrement actif.' })}
          </p>
          <Button asChild className="mt-2">
            <Link href="/account">{L({ en: 'Go to My Account', fr: 'Aller à mon compte' })}</Link>
          </Button>
        </>
      )}
      {status === 'error' && (
        <>
          <XCircle className="h-12 w-12 text-destructive mx-auto" />
          <h2 className="font-semibold text-lg">{L({ en: 'Verification failed', fr: 'Échec de la vérification' })}</h2>
          <p className="text-sm text-muted-foreground">{errorMsg}</p>
          <Button asChild variant="outline" className="mt-2">
            <Link href="/account">{L({ en: 'Go to My Account', fr: 'Aller à mon compte' })}</Link>
          </Button>
        </>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
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
          <h1 className="text-2xl font-bold">{L({ en: 'Email Verification', fr: 'Vérification de l\'e-mail' })}</h1>
        </div>
        <div className="bg-card border rounded-2xl p-8 shadow-sm">
          <Suspense fallback={<div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
            <VerifyEmailContent />
          </Suspense>
        </div>
      </motion.div>
    </div>
  );
}
