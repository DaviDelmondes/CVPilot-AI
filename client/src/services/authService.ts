import api from './api';
import type { AuthResponse } from '../types/auth';

export const authService = {
  async login(payload: { email: string; password: string }) {
    const { data } = await api.post<AuthResponse>('/auth/login', payload);
    return data;
  },
  async register(payload: { name: string; email: string; password: string }) {
    const { data } = await api.post<AuthResponse>('/auth/register', payload);
    return data;
  },
  async me() {
    const { data } = await api.get<AuthResponse['user']>('/auth/me');
    return data;
  }
};
