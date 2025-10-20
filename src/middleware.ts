import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Защищенные роуты
  const protectedRoutes = ['/profile', '/settings', '/market']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/auth/log', request.url))
    }

    // Простая проверка наличия токена (детальная проверка будет в API)
    // Если токен есть, пропускаем запрос
    return NextResponse.next()
  }

  // Если пользователь уже авторизован, перенаправляем с страниц авторизации
  const authRoutes = ['/auth/log', '/auth/reg']
  const isAuthRoute = authRoutes.includes(pathname)

  if (isAuthRoute) {
    const token = request.cookies.get('auth-token')?.value
    if (token) {
      // Если есть токен, перенаправляем на главную
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
