'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

import { Url } from 'next/dist/shared/lib/router/router'
import { LogoutButton } from './LogoutButton'

export function NavSheet({ isAuth }: { isAuth: boolean }) {
  const t = useTranslations('Header')

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="size-8">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="w-[400px] sm:w-[540px]"
      >
        <SheetHeader className="flex flex-col items-center justify-center">
          <Image src="/media/6_w_b.png" alt="" width={72} height={72} />
          <SheetTitle>Welcome to YAHPA</SheetTitle>
          <SheetDescription>What are you looking for today?</SheetDescription>
        </SheetHeader>
        <ul className="flex flex-col items-center gap-2 p-6">
          <ListItemLink href="/">{t('home')}</ListItemLink>
          <ListItemLink href="/about">{t('about')}</ListItemLink>
          <ListItemLink href="/">{t('projects')}</ListItemLink>
          <ListItemLink href="/contact">{t('contact')}</ListItemLink>
          <li className="flex flex-col items-center my-4">
            <span className="mb-2 text-lg font-semibold">{t('registry.title')}</span>
            <ul className="flex flex-col items-center gap-2">
              <ListItemLink href="/registry/search">{t('registry.search.title')}</ListItemLink>
              <ListItemLink href="/registry">{t('registry.about.title')}</ListItemLink>
            </ul>
          </li>
          <li className="flex flex-col items-center my-4">
            <span className="mb-2 text-lg font-semibold">{t('news.title')}</span>
            <ul className="flex flex-col items-center gap-2">
              <ListItemLink href="/#latest">{t('news.latest.title')}</ListItemLink>
              <ListItemLink href="/">{t('news.events.title')}</ListItemLink>
            </ul>
          </li>
        </ul>

        <ul className="flex flex-col items-center gap-2 p-6">
          {isAuth ? (
            <>
              <ListItemLink href="/account">{t('account')}</ListItemLink>
              <li>
                <SheetClose asChild>
                  <LogoutButton />
                </SheetClose>
              </li>
            </>
          ) : (
            <li>
              <SheetClose asChild>
                <Button asChild size="lg">
                  <Link href="/login">{t('login')}</Link>
                </Button>
              </SheetClose>
            </li>
          )}
        </ul>
      </SheetContent>
    </Sheet>
  )
}

function ListItemLink({
  children,
  href,
  ...props
}: React.ComponentPropsWithRef<'li'> & { href: Url }) {
  return (
    <li {...props}>
      <SheetClose asChild>
        <Button asChild variant="link" className="text-md">
          <Link href={href} className="flex items-center p-2 text-md group">
            {children}
          </Link>
        </Button>
      </SheetClose>
    </li>
  )
}
