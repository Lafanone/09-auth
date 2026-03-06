import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function proxy(path: string, isPrivate: boolean = true) {
  const cookieStore = await cookies();
  const hasAuthCookie = 
    cookieStore.has('connect.sid') || 
    cookieStore.has('accessToken') || 
    cookieStore.has('sessionId');

  if (isPrivate && !hasAuthCookie) {
    redirect('/sign-in');
  }

  if (!isPrivate && hasAuthCookie && path !== '/profile') {
    redirect('/profile');
  }
}