import { api } from './api';

export async function checkAuth(): Promise<{ authenticated: boolean; username?: string }> {
  return api.get<{ authenticated: boolean; username?: string }>('/api/admin/me').catch(() => ({ authenticated: false }));
}

export async function logout() {
  await api.post('/api/auth/logout', {}).catch(() => {});
}
