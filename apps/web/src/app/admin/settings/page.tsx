'use client';

import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Globe2, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api';

const socialFields = [
  { key: 'social_facebook', label: 'Facebook', placeholder: 'https://facebook.com/lticsarl', color: 'text-blue-600' },
  { key: 'social_twitter', label: 'X / Twitter', placeholder: 'https://twitter.com/lticsarl', color: 'text-sky-500' },
  { key: 'social_linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/lticsarl', color: 'text-blue-700' },
  { key: 'social_instagram', label: 'Instagram', placeholder: 'https://instagram.com/lticsarl', color: 'text-pink-500' },
  { key: 'social_youtube', label: 'YouTube', placeholder: 'https://youtube.com/@lticsarl', color: 'text-red-500' },
  { key: 'social_whatsapp', label: 'WhatsApp Business', placeholder: 'https://wa.me/2376XXXXXXXX', color: 'text-green-500' },
  { key: 'social_tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@lticsarl', color: 'text-foreground' },
];

export default function AdminSettingsPage() {
  const qc = useQueryClient();
  const { data: settings } = useQuery<Record<string, string>>({
    queryKey: ['settings'],
    queryFn: () => api.get('/api/settings'),
  });

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<Record<string, string>>();

  useEffect(() => {
    if (settings) reset(settings);
  }, [settings, reset]);

  const updateMutation = useMutation({
    mutationFn: (data: Record<string, string>) => api.patch('/api/settings', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['settings'] });
      toast.success('Settings saved successfully');
    },
    onError: () => toast.error('Failed to save settings'),
  });

  const onSubmit = (data: Record<string, string>) => updateMutation.mutate(data);

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Globe2 className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Site Settings</h1>
        </div>
        <p className="text-muted-foreground">Configure your social media links and site settings</p>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-card border rounded-xl p-8 space-y-6">
            <h2 className="text-lg font-bold border-b pb-4">Social Media Links</h2>
            {socialFields.map(({ key, label, placeholder, color }) => (
              <div key={key}>
                <Label htmlFor={key} className={`font-semibold ${color}`}>{label}</Label>
                <Input id={key} {...register(key)} placeholder={placeholder} className="mt-1" type="url" />
              </div>
            ))}
            <Button type="submit" disabled={isSubmitting} className="w-full mt-6">
              {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              {isSubmitting ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
