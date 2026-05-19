'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Loader2, Save, Lock, UserCircle, Mail, ShieldCheck, Eye, EyeOff } from 'lucide-react';
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

function PasswordInput({ id, value, onChange, placeholder, autoComplete }: {
  id: string; value: string; onChange: (v: string) => void;
  placeholder?: string; autoComplete?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || '••••••••'}
        autoComplete={autoComplete}
        className="pr-10"
        required
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

export default function AdminProfilePage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<AdminProfile | null>(null);

  // Form states
  const [nameForm, setNameForm] = useState({ name: '' });
  const [emailForm, setEmailForm] = useState({ email: '', currentPassword: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  // Loading states
  const [savingName, setSavingName] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    adminFetch<AdminProfile>('/api/admin/profile').then((data) => {
      setProfile(data);
      setNameForm({ name: data.name });
      setEmailForm((prev) => ({ ...prev, email: data.email }));
    }).catch(() => {});
  }, []);

  // ── Save display name ────────────────────────────────────────────────────────
  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameForm.name.trim()) return;
    setSavingName(true);
    try {
      const updated = await adminFetch<AdminProfile>('/api/admin/profile', {
        method: 'PATCH',
        body: JSON.stringify({ name: nameForm.name }),
      });
      setProfile(updated);
      toast.success('Display name updated');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSavingName(false);
    }
  };

  // ── Change email ─────────────────────────────────────────────────────────────
  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(emailForm.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!emailForm.currentPassword) {
      toast.error('Current password is required to change email');
      return;
    }
    setSavingEmail(true);
    try {
      const updated = await adminFetch<AdminProfile>('/api/admin/profile/email', {
        method: 'PATCH',
        body: JSON.stringify({ email: emailForm.email, currentPassword: emailForm.currentPassword }),
      });
      setProfile(updated);
      setEmailForm({ email: updated.email, currentPassword: '' });
      toast.success('Email address updated — use your new email to log in next time');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSavingEmail(false);
    }
  };

  // ── Change password ──────────────────────────────────────────────────────────
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
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
      toast.success('Password changed successfully');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSavingPassword(false);
    }
  };

  // ── Avatar upload ────────────────────────────────────────────────────────────
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
      toast.success('Profile picture updated');
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
        <p className="text-muted-foreground mt-1">Manage your admin account credentials and settings</p>
      </div>

      <div className="space-y-6">

        {/* ── Avatar ─────────────────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-2xl p-6">
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
              <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploadingAvatar} className="flex items-center gap-2">
                <Camera className="h-4 w-4" /> Change Photo
              </Button>
              <p className="text-xs text-muted-foreground mt-1.5">JPG, PNG — max 5 MB</p>
            </div>
          </div>
        </motion.div>

        {/* ── Display Name ───────────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="bg-card border rounded-2xl p-6">
          <h3 className="font-semibold mb-1">Display Name</h3>
          <p className="text-xs text-muted-foreground mb-4">Shown in the admin sidebar and dashboard</p>
          <form onSubmit={handleSaveName} className="flex gap-3">
            <Input
              value={nameForm.name}
              onChange={(e) => setNameForm({ name: e.target.value })}
              placeholder="Administrator"
              required
              className="flex-1"
            />
            <Button type="submit" disabled={savingName} className="flex items-center gap-2 flex-shrink-0">
              {savingName ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save
            </Button>
          </form>
        </motion.div>

        {/* ── Email Address ──────────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="bg-card border rounded-2xl p-6">
          <h3 className="font-semibold mb-1 flex items-center gap-2">
            <Mail className="h-4 w-4" /> Email Address
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Current: <span className="font-medium text-foreground">{profile.email}</span>
            &nbsp;— Your current password is required to change this.
          </p>
          <form onSubmit={handleChangeEmail} className="space-y-3">
            <div>
              <Label htmlFor="newEmail">New Email Address</Label>
              <Input
                id="newEmail"
                type="email"
                value={emailForm.email}
                onChange={(e) => setEmailForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="new@example.com"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="emailPassword">Current Password (required)</Label>
              <PasswordInput
                id="emailPassword"
                value={emailForm.currentPassword}
                onChange={(v) => setEmailForm((p) => ({ ...p, currentPassword: v }))}
                autoComplete="current-password"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={savingEmail} className="flex items-center gap-2">
                {savingEmail ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                Update Email
              </Button>
            </div>
          </form>
        </motion.div>

        {/* ── Change Password ────────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="bg-card border rounded-2xl p-6">
          <h3 className="font-semibold mb-1 flex items-center gap-2">
            <Lock className="h-4 w-4" /> Change Password
          </h3>
          <p className="text-xs text-muted-foreground mb-4">Minimum 8 characters. Use a strong, unique password.</p>
          <form onSubmit={handleChangePassword} className="space-y-3">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <PasswordInput
                id="currentPassword"
                value={passwordForm.currentPassword}
                onChange={(v) => setPasswordForm((p) => ({ ...p, currentPassword: v }))}
                autoComplete="current-password"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <PasswordInput
                  id="newPassword"
                  value={passwordForm.newPassword}
                  onChange={(v) => setPasswordForm((p) => ({ ...p, newPassword: v }))}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <PasswordInput
                  id="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={(v) => setPasswordForm((p) => ({ ...p, confirmPassword: v }))}
                  autoComplete="new-password"
                />
              </div>
            </div>
            {passwordForm.newPassword && passwordForm.confirmPassword &&
              passwordForm.newPassword !== passwordForm.confirmPassword && (
                <p className="text-xs text-destructive">Passwords do not match</p>
              )}
            <div className="flex justify-end">
              <Button type="submit" disabled={savingPassword} className="flex items-center gap-2">
                {savingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                Update Password
              </Button>
            </div>
          </form>
        </motion.div>

        {/* ── Security note ──────────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="bg-muted/40 border rounded-2xl p-5 flex gap-3">
          <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">Security reminders</p>
            <p>Passwords are hashed with bcrypt (cost 12) — never stored in plain text.</p>
            <p>Changing your email or password requires your current password as verification.</p>
            <p>After changing email, use the new address to log in on all devices.</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
