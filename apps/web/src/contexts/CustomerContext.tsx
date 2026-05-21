'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface Customer {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  company?: string;
  avatarUrl?: string;
  emailVerified?: boolean;
}

interface CustomerContextType {
  customer: Customer | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { fullName: string; email: string; password: string; phone?: string; country?: string }) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const CustomerContext = createContext<CustomerContextType>({
  customer: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  refreshProfile: async () => {},
});

async function customerFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  const res = await fetch(`${API_URL}${path}`, { ...options, headers, credentials: 'include' });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    try {
      const data = await customerFetch<Customer>('/api/customers/me');
      setCustomer(data);
    } catch {
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refreshProfile(); }, [refreshProfile]);

  const login = async (email: string, password: string) => {
    const res = await customerFetch<{ customer: Customer }>('/api/customers/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setCustomer(res.customer);
  };

  const register = async (data: { fullName: string; email: string; password: string; phone?: string; country?: string }) => {
    const res = await customerFetch<{ customer: Customer }>('/api/customers/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setCustomer(res.customer);
  };

  const logout = async () => {
    await customerFetch('/api/customers/logout', { method: 'POST' }).catch(() => {});
    setCustomer(null);
  };

  return (
    <CustomerContext.Provider value={{ customer, loading, login, register, logout, refreshProfile }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  return useContext(CustomerContext);
}

export { customerFetch };
