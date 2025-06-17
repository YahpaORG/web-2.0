'use server'

import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/server/get-user.action'
import { LogoutButton } from './LogoutButton'
import { ThemeDropdown } from './ThemeDropdown'
import LocaleSwitcher from './LocaleSwitcher'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { NavigationMenuDesktop } from './Nav'
import Image from 'next/image'
import { NavDrawer } from './NavDrawer'

export async function Header() {
  const user = await getUser()
  const t = await getTranslations()

  return (
    <header className="flex items-center justify-between m-3 xl:m-6">
      <Link href="/" className="flex flex-row items-center flex-1 gap-1">
        <Image src="/media/6_w_b.png" alt="" width={72} height={72} />
        <div className="flex flex-col justify-center">
          <span className="text-xl font-semibold">{t('yahpa')}</span>
          <span className="text-xs hidden xl:inline-block w-[250px]">{t('yahpa_full')}</span>
        </div>
      </Link>

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
                <LogoutButton />
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
        <NavDrawer isAuth={!!user} />
      </div>
    </header>
  )
}
