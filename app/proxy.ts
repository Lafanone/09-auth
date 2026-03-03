import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function proxy(path: string, isPrivate: boolean = true) {
  const cookieStore = await cookies();
  const hasAuthCookie = cookieStore.has('accessToken') || cookieStore.has('connect.sid');

  if (isPrivate && !hasAuthCookie) {
    redirect('/sign-in');
  }

  if (!isPrivate && hasAuthCookie) {
    redirect('/profile');
  }
}