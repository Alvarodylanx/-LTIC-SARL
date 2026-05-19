'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Loader2, Save, Lock, UserCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getAdminToken } from '@/lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface AdminProfile {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
}

async function adminFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAdminToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export default function AdminProfilePage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [profileForm, setProfileForm] = useState({ name: '', email: '' });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    adminFetch<AdminProfile>('/api/admin/profile').then((data) => {
      setProfile(data);
      setProfileForm({ name: data.name, email: data.email });
    }).catch(() => {});
  }, []);

  const setPasswordField = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setPasswordForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const updated = await adminFetch<AdminProfile>('/api/admin/profile', {
        method: 'PATCH',
        body: JSON.stringify(profileForm),
      });
      setProfile(updated);
      setProfileForm({ name: updated.name, email: updated.email });
      toast.success('Profile updated!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setSavingPassword(true);
    try {
      await adminFetch('/api/admin/profile/password', {
        method: 'PATCH',
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success('Password changed!');
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
      const token = getAdminToken();
      const formData = new FormData();
      formData.append('avatar', file);
      const res = await fetch(`${API_URL}/api/admin/profile/avatar`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token || ''}` },
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const updated = await res.json();
      setProfile(updated);
      toast.success('Avatar updated!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setUploadingAvatar(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  if (!profile) return (
    <div className="flex items-center justify-center h-96">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your admin account settings</p>
      </div>

      <div className="space-y-6">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border rounded-2xl p-6"
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <UserCircle className="h-4 w-4" /> Profile Picture
          </h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              {profile.avatarUrl ? (
                <img
                  src={`${API_URL}${profile.avatarUrl}`}
                  alt={profile.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-background shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center border-4 border-background shadow-lg">
                  <span className="text-white text-2xl font-bold">{profile.name[0]?.toUpperCase()}</span>
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
                Change Photo
              </Button>
              <p className="text-xs text-muted-foreground mt-1.5">JPG, PNG up to 5MB</p>
            </div>
          </div>
        </motion.div>

        {/* Profile info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-card border rounded-2xl p-6"
        >
          <h3 className="font-semibold mb-4">Account Information</h3>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                value={profileForm.name}
                onChange={(e) => setProfileForm((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={savingProfile} className="flex items-center gap-2">
                {savingProfile ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Changes
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
            <Lock className="h-4 w-4" /> Change Password
          </h3>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordForm.currentPassword}
                onChange={setPasswordField('currentPassword')}
                required
                autoComplete="current-password"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={setPasswordField('newPassword')}
                  required
                  autoComplete="new-password"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={setPasswordField('confirmPassword')}
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={savingPassword} className="flex items-center gap-2">
                {savingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                Update Password
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
