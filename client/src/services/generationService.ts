import api from './api';
import type { Generation, GenerationType } from '../types/generation';

export interface CreateGenerationPayload {
  type: GenerationType;
  area: string;
  experienceLevel: string;
  skills: string[];
  goal: string;
  baseText?: string;
  tone: 'formal' | 'confident' | 'objective' | 'modern';
}

export const generationService = {
  async create(payload: CreateGenerationPayload) {
    const { data } = await api.post<Generation>('/generations', payload);
    return data;
  },
  async list(type?: GenerationType | 'ALL') {
    const { data } = await api.get<Generation[]>('/generations', {
      params: type && type !== 'ALL' ? { type } : {}
    });
    return data;
  },
  async remove(id: string) {
    await api.delete(`/generations/${id}`);
  }
};
