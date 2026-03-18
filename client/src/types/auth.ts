export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  currentPlan: {
    id: string;
    name: string;
    generationLimit: number | null;
  };
  generationCount: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}
