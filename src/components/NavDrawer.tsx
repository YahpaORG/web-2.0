'use client'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from '@/components/ui/drawer'
import { MenuIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Url } from 'next/dist/shared/lib/router/router'
import Image from 'next/image'
import Link from 'next/link'
import { LogoutButton } from './LogoutButton'
import { Button } from './ui/button'

export function NavDrawer({ isAuth }: { isAuth: boolean }) {
  const t = useTranslations('Header')

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="size-8">
          <MenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full max-w-[66%]">
        <DrawerHeader className="flex flex-col items-center justify-center">
          <Image src="/media/6_w_b.png" alt="" width={72} height={72} />
          <DrawerTitle>Welcome to YAHPA</DrawerTitle>
          <DrawerDescription>What are you looking for today?</DrawerDescription>
        </DrawerHeader>
        <ul className="flex flex-col items-center gap-2 p-6">
          <DrawerLink href="/">{t('home')}</DrawerLink>
          <DrawerLink href="/about">{t('about')}</DrawerLink>
          <DrawerLink href="/">{t('projects')}</DrawerLink>
          <DrawerLink href="/contact">{t('contact')}</DrawerLink>
          <li className="flex flex-col items-center my-4">
            <span className="mb-2 text-lg font-semibold">{t('registry.title')}</span>
            <ul className="flex flex-col items-center gap-2">
              <DrawerLink href="/registry/search">{t('registry.search.title')}</DrawerLink>
              <DrawerLink href="/registry">{t('registry.about.title')}</DrawerLink>
            </ul>
          </li>
          <li className="flex flex-col items-center my-4">
            <span className="mb-2 text-lg font-semibold">{t('news.title')}</span>
            <ul className="flex flex-col items-center gap-2">
              <DrawerLink href="/#latest">{t('news.latest.title')}</DrawerLink>
              <DrawerLink href="/">{t('news.events.title')}</DrawerLink>
            </ul>
          </li>
        </ul>

        <ul className="flex flex-col items-center gap-2 p-6">
          {isAuth ? (
            <>
              <DrawerLink href="/account">{t('account')}</DrawerLink>
              <li>
                <DrawerClose>
                  <LogoutButton />
                </DrawerClose>
              </li>
            </>
          ) : (
            <DrawerClose>
              <Button size="lg">
                <Link href="/login">{t('login')}</Link>
              </Button>
            </DrawerClose>
          )}
        </ul>
      </DrawerContent>
    </Drawer>
  )
}

function DrawerLink({
  children,
  href,
  ...props
}: React.ComponentPropsWithRef<'li'> & { href: Url }) {
  return (
    <li {...props}>
      <DrawerClose asChild>
        <Button asChild variant="link" className="text-md">
          <Link href={href} className="flex items-center p-2 text-md group">
            {children}
          </Link>
        </Button>
      </DrawerClose>
    </li>
  )
}
