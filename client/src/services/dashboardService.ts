import api from './api';
import type { DashboardMetrics } from '../types/generation';

export const dashboardService = {
  async getMetrics() {
    const { data } = await api.get<DashboardMetrics>('/dashboard');
    return data;
  }
};
