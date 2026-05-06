import createMiddleware from 'next-intl/middleware'
import { auth } from '@/lib/auth'
import { routing } from '@/i18n/routing'
import type { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export default auth((req: NextRequest & { auth: { user?: unknown } | null }) => {
  const { pathname } = req.nextUrl

  console.debug('[middleware] path:', pathname, 'auth:', !!req.auth)

  const isAdminRoute = /^\/(ru|en)\/admin/.test(pathname)
  const isLoginPage = /^\/(ru|en)\/admin\/login/.test(pathname)

  if (isAdminRoute && !isLoginPage && !req.auth) {
    const locale = pathname.match(/^\/(ru|en)\//)?.[1] ?? 'ru'
    console.debug('[middleware] unauthenticated admin access, redirecting to login, locale:', locale)
    return Response.redirect(new URL(`/${locale}/admin/login`, req.url))
  }

  return intlMiddleware(req)
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
}
