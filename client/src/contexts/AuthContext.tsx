import { createContext, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { authService } from '../services/authService';
import type { User } from '../types/auth';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('cvpilot_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setUser(await authService.me());
      } catch {
        localStorage.removeItem('cvpilot_token');
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    void bootstrap();
  }, [token]);

  const persist = (jwt: string, currentUser: User) => {
    localStorage.setItem('cvpilot_token', jwt);
    setToken(jwt);
    setUser(currentUser);
  };

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    persist(response.token, response.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await authService.register({ name, email, password });
    persist(response.token, response.user);
  };

  const logout = () => {
    localStorage.removeItem('cvpilot_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
