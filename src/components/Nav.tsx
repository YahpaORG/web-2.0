'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import * as React from 'react'

export function NavigationMenuDesktop() {
  const t = useTranslations('Header')

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/about">{t('about')}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/registry/search">{t('registry.title')}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/projects">{t('projects')}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/contact">{t('contact')}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props} className="flex flex-col flex-1">
      <NavigationMenuLink asChild>
        <Link href={href} className="group">
          <div className="flex flex-col p-2">
            <span className="self-start text-sm font-medium leading-none group-hover:underline">
              {title}
            </span>
            <p className="text-sm leading-snug text-muted-foreground line-clamp-2">{children}</p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
