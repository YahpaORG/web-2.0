'use client'

import Link, { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Next.js Router Link component for server or client side that prepends the current locale to the href.
 */
export default function LinkWithLocale(props: PropsWithChildren<LinkProps>) {
  const pathname = usePathname()
  const localePath = pathname.split('/')[1]

  return <Link {...props} href={`/${localePath}${props.href}`} />
}
