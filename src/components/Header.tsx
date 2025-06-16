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

export async function Header() {
  const user = await getUser()
  const t = await getTranslations()

  return (
    <header className="flex items-center justify-between m-6">
      <div className="flex flex-row items-center flex-1 gap-1">
        <Image src="/media/6_w_b.png" alt="" width={72} height={72} />
        <div className="flex flex-col justify-center">
          <span className="text-xl font-semibold">
            <Link href="/">{t('yahpa')}</Link>
          </span>
          <span className="text-xs hidden md:inline-block w-[300px]">{t('yahpa_full')}</span>
        </div>
      </div>
      <div className="flex-row flex-1 hidden w-full md:flex">
        <NavigationMenuDesktop />
      </div>

      <div className="flex justify-end flex-1">
        <ul className="flex flex-row items-center gap-4">
          {user ? (
            <>
              <li>
                <Link href="/account">{t('header.account')}</Link>
              </li>
              <li>
                <LogoutButton />
              </li>
            </>
          ) : (
            <li>
              <Button asChild>
                <Link href="/login">{t('header.login')}</Link>
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
    </header>
  )
}
