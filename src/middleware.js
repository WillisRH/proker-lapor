// src/middleware.js

import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Define paths that are considered public (accessible without a token)
  const isPublicPath = path === '/login' || path === '/signup';

  // Get the token from the cookies
  const token = request.cookies.get('token')?.value || '';

  // Redirect logic based on the path and token presence
  if (isPublicPath && token) {
    // If trying to access a public path with a token, redirect to the home page
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // If trying to access a protected path without a token, redirect to the login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

// It specifies the paths for which this middleware should be executed. 
// In this case, it's applied to '/', '/profile', '/login', and '/signup'.
export const config = {
  // matcher: [
  //   '/',
  //   '/profile',
  //   '/login',
  //   '/signup',
  //   '/new',
  //   '/manage',
  //   '/manage/users'
  // ]
  matcher: '/((?!api|_next|static|public|favicon.ico).*)'
};
