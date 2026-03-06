'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession } from '@/lib/api/clientApi';
import Loader from '../Loader/Loader'; 

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [isChecking, setIsChecking] = useState(false);
  const isPrivate = pathname.startsWith('/profile') || pathname.startsWith('/notes');

  useEffect(() => {
    const verify = async () => {
      if (!isPrivate) return;

      setIsChecking(true);
      try {
        const user = await checkSession();
        if (user && user.email) {
          setUser(user);
        } else {
          clearIsAuthenticated();
          router.push('/sign-in');
        }
      } catch (err) {
        clearIsAuthenticated();
        router.push('/sign-in');
      } finally {
        setIsChecking(false);
      }
    };

    verify();
  }, [pathname, isPrivate, setUser, clearIsAuthenticated, router]);

  if (isPrivate && isChecking) {
    return <Loader />;
  }

  return <>{children}</>;
}