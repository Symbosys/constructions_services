import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to protect Admin Dashboard routes.
 * Ensures unauthenticated users cannot access /admin/dashboard or any /admin/* pages.
 * Redirects logged-in users away from /admin/login directly to /admin/dashboard.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminToken = request.cookies.get('admin_token')?.value;

  if (pathname.startsWith('/admin')) {
    // 1. Root /admin or /admin/
    if (pathname === '/admin' || pathname === '/admin/') {
      if (adminToken) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } else {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }

    // 2. /admin/login page
    if (pathname === '/admin/login') {
      // If already authenticated, redirect to admin dashboard
      if (adminToken) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      // If not logged in, allow access to login page
      return NextResponse.next();
    }

    // 3. Protected admin sub-routes (/admin/dashboard, /admin/services, /admin/home, /admin/contact, etc.)
    if (!adminToken) {
      // Admin is not logged in: block access and redirect to login
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
