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
          <NavigationMenuTrigger>{t('registry.title')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col w-[300px] lg:w-[400px] p-2">
              <ListItem href="/registry/search" title={t('registry.search.title')}>
                {t('registry.search.description')}
              </ListItem>
              <ListItem href="/registry" title={t('registry.about.title')}>
                {t('registry.about.description')}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t('projects.title')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col w-[300px] lg:w-[400px] p-2">
              <ListItem href="/" title={t('projects.events.title')}>
                {t('projects.events.description')}
              </ListItem>
              <ListItem href="/" title={t('projects.guide.title')}>
                {t('projects.guide.description')}
              </ListItem>
            </ul>
          </NavigationMenuContent>
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
