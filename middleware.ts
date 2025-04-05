import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/auth/signIn' || path === '/auth/signUp';
  
  // Get the token from localStorage (via cookies)
  const token = request.cookies.get('auth-token')?.value || '';
  
  // Redirect logic
  if (isPublicPath && token) {
    // If user is on a public path but is authenticated, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  if (!isPublicPath && !token) {
    // If user is on a protected path but is not authenticated, redirect to login
    return NextResponse.redirect(new URL('/auth/signIn', request.url));
  }
  
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/signIn',
    '/auth/signUp',
  ],
}; 