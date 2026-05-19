'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { checkAuth } from '@/lib/auth';

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    checkAuth()
      .then((res) => {
        if (res.authenticated) router.replace('/admin/dashboard');
        else router.replace('/auth/login?redirect=/admin/dashboard');
      })
      .catch(() => router.replace('/auth/login?redirect=/admin/dashboard'));
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
