import api from './api';
import type { AdminStats, AdminUser } from '../types/admin';

export const adminService = {
  async getUsers() {
    const { data } = await api.get<AdminUser[]>('/admin/users');
    return data;
  },
  async getStats() {
    const { data } = await api.get<AdminStats>('/admin/stats');
    return data;
  },
  async updatePlan(userId: string, planId: string) {
    const { data } = await api.patch<AdminUser>(`/admin/users/${userId}/plan`, { planId });
    return data;
  },
  async getPlans() {
    const { data } = await api.get<{ id: string; name: string }[]>('/plans');
    return data;
  }
};
