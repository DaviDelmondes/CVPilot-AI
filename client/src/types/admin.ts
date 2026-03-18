export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  generationCount: number;
  currentPlan: {
    id: string;
    name: string;
  };
  createdAt: string;
}

export interface AdminStats {
  totalUsers: number;
  totalGenerations: number;
  premiumUsers: number;
  freeUsers: number;
}
