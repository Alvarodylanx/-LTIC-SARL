'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Loader2, Save, Lock, User } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { CountrySelect } from '@/components/ui/CountrySelect';
import { useCustomer, customerFetch } from '@/contexts/CustomerContext';
import { useLanguage } from '@/contexts/LanguageContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function CustomerProfilePage() {
  const { customer, refreshProfile } = useCustomer();
  const { L } = useLanguage();
  const fileRef = useRef<HTMLInputElement>(null);

  const [profileForm, setProfileForm] = useState({
    fullName: customer?.fullName || '',
    phone: customer?.phone || '',
    country: customer?.country || '',
    company: customer?.company || '',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  if (!customer) return null;

  const setProfile = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setProfileForm((prev) => ({ ...prev, [field]: e.target.value }));

  const setPassword = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setPasswordForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await customerFetch('/api/customers/me', {
        method: 'PATCH',
        body: JSON.stringify(profileForm),
      });
      await refreshProfile();
      toast.success(L({ en: 'Profile updated!', fr: 'Profil mis à jour!' }));
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error(L({ en: 'Passwords do not match', fr: 'Les mots de passe ne correspondent pas' }));
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error(L({ en: 'Password must be at least 6 characters', fr: 'Au moins 6 caractères requis' }));
      return;
    }
    setSavingPassword(true);
    try {
      await customerFetch('/api/customers/me/password', {
        method: 'PATCH',
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success(L({ en: 'Password changed!', fr: 'Mot de passe changé!' }));
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSavingPassword(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const token = localStorage.getItem('customer_token');
      const formData = new FormData();
      formData.append('avatar', file);
      const res = await fetch(`${API_URL}/api/customers/me/avatar`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      await refreshProfile();
      toast.success(L({ en: 'Avatar updated!', fr: 'Avatar mis à jour!' }));
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setUploadingAvatar(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">{L({ en: 'Profile Settings', fr: 'Paramètres du profil' })}</h2>
        <p className="text-muted-foreground text-sm mt-1">
          {L({ en: 'Manage your personal information', fr: 'Gérez vos informations personnelles' })}
        </p>
      </div>

      {/* Avatar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border rounded-2xl p-6"
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <User className="h-4 w-4" />{L({ en: 'Profile Picture', fr: 'Photo de profil' })}
        </h3>
        <div className="flex items-center gap-4">
          <div className="relative">
            {customer.avatarUrl ? (
              <img
                src={`${API_URL}${customer.avatarUrl}`}
                alt={customer.fullName}
                className="w-20 h-20 rounded-full object-cover border-4 border-background shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center border-4 border-background shadow-lg">
                <span className="text-white text-2xl font-bold">{customer.fullName[0]?.toUpperCase()}</span>
              </div>
            )}
            {uploadingAvatar && (
              <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                <Loader2 className="h-6 w-6 text-white animate-spin" />
              </div>
            )}
          </div>
          <div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileRef.current?.click()}
              disabled={uploadingAvatar}
              className="flex items-center gap-2"
            >
              <Camera className="h-4 w-4" />
              {L({ en: 'Change Photo', fr: 'Changer la photo' })}
            </Button>
            <p className="text-xs text-muted-foreground mt-1.5">{L({ en: 'JPG, PNG up to 5MB', fr: 'JPG, PNG jusqu\'à 5Mo' })}</p>
          </div>
        </div>
      </motion.div>

      {/* Personal info */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="bg-card border rounded-2xl p-6"
      >
        <h3 className="font-semibold mb-4">{L({ en: 'Personal Information', fr: 'Informations personnelles' })}</h3>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">{L({ en: 'Full Name', fr: 'Nom complet' })}</Label>
              <Input id="fullName" value={profileForm.fullName} onChange={setProfile('fullName')} required />
            </div>
            <div className="space-y-1.5">
              <Label>{L({ en: 'Email', fr: 'E-mail' })}</Label>
              <Input value={customer.email} disabled className="bg-muted/50" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="company">{L({ en: 'Company', fr: 'Société' })}</Label>
              <Input id="company" value={profileForm.company} onChange={setProfile('company')} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="country">{L({ en: 'Country', fr: 'Pays' })}</Label>
            <CountrySelect
              id="country"
              value={profileForm.country}
              onChange={v => setProfileForm(prev => ({ ...prev, country: v }))}
              placeholderEn="Select country…"
              placeholderFr="Sélectionner un pays…"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">{L({ en: 'Phone', fr: 'Téléphone' })}</Label>
            <PhoneInput
              id="phone"
              value={profileForm.phone}
              onChange={v => setProfileForm(prev => ({ ...prev, phone: v }))}
              syncCountry={profileForm.country}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={savingProfile} className="flex items-center gap-2">
              {savingProfile ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {L({ en: 'Save Changes', fr: 'Enregistrer' })}
            </Button>
          </div>
        </form>
      </motion.div>

      {/* Change password */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16 }}
        className="bg-card border rounded-2xl p-6"
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Lock className="h-4 w-4" />{L({ en: 'Change Password', fr: 'Changer le mot de passe' })}
        </h3>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="currentPassword">{L({ en: 'Current Password', fr: 'Mot de passe actuel' })}</Label>
            <Input
              id="currentPassword"
              type="password"
              value={passwordForm.currentPassword}
              onChange={setPassword('currentPassword')}
              required
              autoComplete="current-password"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="newPassword">{L({ en: 'New Password', fr: 'Nouveau mot de passe' })}</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={setPassword('newPassword')}
                required
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">{L({ en: 'Confirm Password', fr: 'Confirmer' })}</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={setPassword('confirmPassword')}
                required
                autoComplete="new-password"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={savingPassword} className="flex items-center gap-2">
              {savingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              {L({ en: 'Update Password', fr: 'Mettre à jour' })}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

