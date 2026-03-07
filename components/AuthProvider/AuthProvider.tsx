'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession, getMe } from '@/lib/api/clientApi';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isChecking, setIsChecking] = useState(true);
  const { setUser, clearIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkSession();
        const user = await getMe();
        setUser(user);
      } catch (error) {
        console.error('Помилка валідації сесії:', error);
        clearIsAuthenticated();
      } finally {
        setIsChecking(false);
      }
    };

    verifyAuth();
  }, [setUser, clearIsAuthenticated]);

  if (isChecking) {
    return null; 
  }

  return <>{children}</>;
}