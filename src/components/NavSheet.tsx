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
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { Url } from 'next/dist/shared/lib/router/router'
import { LogoutButton } from './LogoutButton'
import { useTranslations } from 'next-intl'

type NavSection = {
  label: string | null
  links: { href: string; label: string }[]
}

export function NavSheet({ isAuth, sections }: { isAuth: boolean; sections: NavSection[] }) {
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
        className="w-100 sm:w-135"
      >
        <SheetHeader className="flex flex-col items-center justify-center">
          <Image src="/media/logo_w_b.png" alt="" width={72} height={72} />
          <SheetTitle>Welcome to YAHPA</SheetTitle>
          <SheetDescription>What are you looking for today?</SheetDescription>
        </SheetHeader>
        <ul className="flex flex-col items-center gap-2 p-6">
          {sections.map((section) =>
            section.label ? (
              <li key={section.label} className="flex flex-col items-center my-4">
                <span className="mb-2 text-lg font-semibold">{section.label}</span>
                <ul className="flex flex-col items-center gap-2">
                  {section.links.map((link) => (
                    <ListItemLink key={link.href} href={link.href}>
                      {link.label}
                    </ListItemLink>
                  ))}
                </ul>
              </li>
            ) : (
              section.links.map((link) => (
                <ListItemLink key={link.href} href={link.href}>
                  {link.label}
                </ListItemLink>
              ))
            )
          )}
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