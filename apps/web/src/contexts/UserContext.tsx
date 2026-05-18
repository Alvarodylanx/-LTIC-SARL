'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface ClientUser {
  id: number;
  name: string;
  email: string;
  notifyProducts: boolean;
  notifyNews: boolean;
  notifyServices: boolean;
  notifyOrders: boolean;
}

interface UserContextValue {
  user: ClientUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updatePreferences: (prefs: Partial<Pick<ClientUser, 'notifyProducts' | 'notifyNews' | 'notifyServices' | 'notifyOrders'>>) => Promise<void>;
  openAuth: (mode?: 'login' | 'register') => void;
  authOpen: boolean;
  authMode: 'login' | 'register';
  setAuthMode: (m: 'login' | 'register') => void;
  closeAuth: () => void;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  notifyProducts?: boolean;
  notifyNews?: boolean;
  notifyServices?: boolean;
  notifyOrders?: boolean;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ClientUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('user_token') : null;
    if (stored) {
      setToken(stored);
      fetch(`${API_URL}/api/users/me`, { headers: { Authorization: `Bearer ${stored}` } })
        .then(r => r.ok ? r.json() : null)
        .then(u => { if (u) setUser(u); else { localStorage.removeItem('user_token'); setToken(null); } })
        .catch(() => { localStorage.removeItem('user_token'); setToken(null); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) { const e = await res.json(); throw new Error(e.message || 'Login failed'); }
    const data = await res.json();
    localStorage.setItem('user_token', data.token);
    setToken(data.token);
    setUser(data.user);
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    const res = await fetch(`${API_URL}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) { const e = await res.json(); throw new Error(e.message || 'Registration failed'); }
    const result = await res.json();
    localStorage.setItem('user_token', result.token);
    setToken(result.token);
    setUser(result.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user_token');
    setToken(null);
    setUser(null);
  }, []);

  const updatePreferences = useCallback(async (prefs: any) => {
    const stored = localStorage.getItem('user_token');
    const res = await fetch(`${API_URL}/api/users/preferences`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${stored}` },
      body: JSON.stringify(prefs),
    });
    if (!res.ok) throw new Error('Failed to update preferences');
    const updated = await res.json();
    setUser(updated);
  }, []);

  const openAuth = useCallback((mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => setAuthOpen(false), []);

  return (
    <UserContext.Provider value={{ user, token, loading, login, register, logout, updatePreferences, openAuth, authOpen, authMode, setAuthMode, closeAuth }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
