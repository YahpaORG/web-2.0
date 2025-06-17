'use server'

import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { getUser } from '@/lib/server/get-user.action'
import { getTranslations } from 'next-intl/server'
import LocaleSwitcher from './LocaleSwitcher'
import { YahpaLogo } from './Logo'
import { LogoutButton } from './LogoutButton'
import { NavigationMenuDesktop } from './Nav'
import { NavSheet } from './NavSheet'
import { ThemeDropdown } from './ThemeDropdown'

export async function Header() {
  const user = await getUser()
  const t = await getTranslations()

  return (
    <header className="flex items-center justify-between m-3 xl:m-6">
      <YahpaLogo />

      <div className="flex-row justify-center flex-1 hidden w-full xl:flex">
        <NavigationMenuDesktop />
      </div>

      <div className="justify-end flex-1 hidden xl:flex">
        <ul className="flex flex-row items-center gap-4">
          {user ? (
            <>
              <li>
                <Link href="/account">{t('Header.account')}</Link>
              </li>
              <li>
                <LogoutButton className="text-sm" />
              </li>
            </>
          ) : (
            <li>
              <Button asChild>
                <Link href="/login">{t('Header.login')}</Link>
              </Button>
            </li>
          )}
          <li>
            <LocaleSwitcher />
          </li>
          <li>
            <ThemeDropdown />
          </li>
        </ul>
      </div>

      <div className="flex xl:hidden">
        <NavSheet isAuth={!!user} />
      </div>
    </header>
  )
}
