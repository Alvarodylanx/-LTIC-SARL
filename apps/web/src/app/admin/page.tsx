'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { ShieldAlert, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { checkAuth, login } from '@/lib/auth';

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});
type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAuth().then((res) => {
      if (res.authenticated) router.push('/admin/dashboard');
      else setChecking(false);
    });
  }, [router]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await login(data.username, data.password);
      if (res.authenticated) {
        router.push('/admin/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
    } catch {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-muted/40 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card border rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground text-sm mt-1">LTIC SARL — Administration</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" {...register('username')} className="mt-1" autoComplete="username" />
            {errors.username && <p className="text-destructive text-xs mt-1">Required</p>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register('password')} className="mt-1" autoComplete="current-password" />
            {errors.password && <p className="text-destructive text-xs mt-1">Required</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
