import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decodeToken } from './actions/token'

const protectedRoutes = ['/admin']
const publicRoutes = ['/login', '/admin/login', '/signup', '/']

export default async function middleware(req) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)
   
    // 3. Decrypt the session from the cookie
    const cookie = cookies().get('token')?.value
    
    const userId = decodeToken(cookie)

    // 5. Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !userId) {
      return NextResponse.redirect(new URL(`${path.startsWith('/admin') ? '/admin/login' : '/login'}`, req.nextUrl))
    }
   
    // 6. Redirect to /dashboard if the user is authenticated
    if (
      isPublicRoute &&
      userId &&
      !req.nextUrl.pathname.startsWith('/admin')
    ) {
      return NextResponse.redirect(new URL('/admin', req.nextUrl))
    }
   
    return NextResponse.next()
  }
   
  // Routes Middleware should not run on
  export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  }