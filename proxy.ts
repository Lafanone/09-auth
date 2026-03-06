import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAuthCookie = 
    request.cookies.has('connect.sid') || 
    request.cookies.has('accessToken') || 
    request.cookies.has('sessionId');

  const isAuthRoute = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
  const isPrivateRoute = pathname.startsWith('/profile') || pathname.startsWith('/notes');

  if (isPrivateRoute && !hasAuthCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isAuthRoute && hasAuthCookie) {
    return NextResponse.redirect(new URL('/notes/filter/all/1', request.url));
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*',
    '/sign-in',
    '/sign-up',
  ],
};