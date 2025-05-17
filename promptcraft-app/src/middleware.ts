import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// List of paths that require authentication
const protectedPaths = [
  '/profile',
  '/dashboard',
  '/settings',
  '/my-prompts',
  '/purchases',
];

// List of paths that are only accessible to non-authenticated users
const authPaths = [
  '/login',
  '/join',
  '/forgot-password',
  '/reset-password',
];

// List of paths that require admin access
const adminPaths = [
  '/admin',
  '/admin/prompts',
  '/admin/categories',
  '/admin/users',
  '/admin/analytics',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is an admin path
  if (adminPaths.some(path => pathname.startsWith(path))) {
    console.log("Middleware - Checking admin access for path:", pathname);

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    console.log("Middleware - Token:", token);

    // If not logged in, redirect to login
    if (!token) {
      console.log("Middleware - No token found, redirecting to login");
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(pathname));
      return NextResponse.redirect(url);
    }

    // Special case for ballery@example.com
    if (token.email === "ballery@example.com") {
      console.log("Middleware - Allowing access for ballery@example.com");
      return NextResponse.next();
    }

    // Special case for the admin user
    if (token.email === "ballery@example.com") {
      console.log("Middleware - Allowing access for admin user ballery@example.com");
      return NextResponse.next();
    }

    // Check if user is admin
    if (token.role !== 'admin' && token.role !== 'superadmin') {
      console.log("Middleware - User is not admin, redirecting to unauthorized. Role:", token.role);
      // Redirect to unauthorized page
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    console.log("Middleware - Admin access granted");
  }

  // For now, we'll just pass through all other requests
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
