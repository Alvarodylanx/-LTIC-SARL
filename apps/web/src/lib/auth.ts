import { api } from './api';

export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

export function setAdminToken(token: string) {
  localStorage.setItem('admin_token', token);
}

export function clearAdminToken() {
  localStorage.removeItem('admin_token');
}

export async function checkAuth(): Promise<{ authenticated: boolean; username?: string }> {
  return api.get('/api/admin/me');
}

export async function login(username: string, password: string) {
  const res = await api.post<{ authenticated: boolean; username: string; token: string }>(
    '/api/admin/login', { username, password }
  );
  if (res.authenticated && res.token) setAdminToken(res.token);
  return res;
}

export async function logout() {
  await api.post('/api/admin/logout', {}).catch(() => {});
  clearAdminToken();
}
