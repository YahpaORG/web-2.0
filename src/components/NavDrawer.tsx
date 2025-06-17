'use client'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { MenuIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Url } from 'next/dist/shared/lib/router/router'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { LogoutButton } from './LogoutButton'
import { Button } from './ui/button'

export function NavDrawer({ isAuth }: { isAuth: boolean }) {
  const [open, setOpen] = useState<boolean>(false)
  const t = useTranslations('Header')

  const close = () => setOpen(false)

  return (
    <Drawer onClose={close} open={open} direction="left" handleOnly={false}>
      <DrawerTrigger>
        <Button
          onClick={() => setOpen((prev) => !prev)}
          variant="outline"
          size="icon"
          className="size-8"
        >
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
          <DrawerLink onClick={close} href="/">
            {t('home')}
          </DrawerLink>
          <DrawerLink onClick={close} href="/about">
            {t('about')}
          </DrawerLink>
          <DrawerLink onClick={close} href="/">
            {t('projects')}
          </DrawerLink>
          <DrawerLink onClick={close} href="/contact">
            {t('contact')}
          </DrawerLink>
          <li className="flex flex-col items-center my-4">
            <span className="mb-2 text-lg font-semibold">{t('registry.title')}</span>
            <ul className="flex flex-col items-center gap-2">
              <DrawerLink onClick={close} href="/registry/search">
                {t('registry.search.title')}
              </DrawerLink>
              <DrawerLink onClick={close} href="/registry">
                {t('registry.about.title')}
              </DrawerLink>
            </ul>
          </li>
          <li className="flex flex-col items-center my-4">
            <span className="mb-2 text-lg font-semibold">{t('news.title')}</span>
            <ul className="flex flex-col items-center gap-2">
              <DrawerLink onClick={close} href="#latest">
                {t('news.latest.title')}
              </DrawerLink>
              <DrawerLink onClick={close} href="/">
                {t('news.events.title')}
              </DrawerLink>
            </ul>
          </li>
        </ul>

        <div className="flex flex-col items-center gap-2 p-6">
          {isAuth ? (
            <LogoutButton />
          ) : (
            <Button size="lg" onClick={close}>
              <Link href="/login">{t('login')}</Link>
            </Button>
          )}
        </div>
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
      <Button asChild variant="link" className="text-md">
        <Link href={href} className="flex items-center p-2 text-md group">
          {children}
        </Link>
      </Button>
    </li>
  )
}
