import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|admin|media|_next/static|_next/image|favicon.ico).*)'],
}
