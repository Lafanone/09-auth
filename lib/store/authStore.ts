import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthStore {
    user: User | null;
    isAuthenticated: (user: User) => void;
    clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>() ((set) => ({
  user: null,
  isAuthenticated: false,
  
  setUser: (user) => set({ user, isAuthenticated: true }),
  
  clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
}));