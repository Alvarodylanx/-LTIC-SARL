'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface AdminProfile {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AdminProfileContextType {
  profile: AdminProfile | null;
  setProfile: (p: AdminProfile) => void;
  refreshProfile: () => void;
}

const AdminProfileContext = createContext<AdminProfileContextType>({
  profile: null,
  setProfile: () => {},
  refreshProfile: () => {},
});

export function AdminProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<AdminProfile | null>(null);

  const refreshProfile = useCallback(() => {
    fetch('/api/admin/profile', { credentials: 'include' })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setProfile(data); })
      .catch(() => {});
  }, []);

  useEffect(() => { refreshProfile(); }, [refreshProfile]);

  return (
    <AdminProfileContext.Provider value={{ profile, setProfile, refreshProfile }}>
      {children}
    </AdminProfileContext.Provider>
  );
}

export const useAdminProfile = () => useContext(AdminProfileContext);
