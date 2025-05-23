'use server'

import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/server/get-user.action'
import { LogoutButton } from './LogoutButton'
import { ThemeDropdown } from './ThemeDropdown'
import LocaleSwitcher from './LocaleSwitcher'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

export async function Header() {
  const user = await getUser()
  const t = await getTranslations()

  return (
    <header className="flex items-center justify-between m-6">
      <div className="flex flex-col justify-center flex-1">
        <span className="text-2xl font-semibold">
          <Link href="/">{t('yahpa')}</Link>
        </span>
        <span className="text-sm">{t('yahpa_full')}</span>
      </div>

      <nav className="flex justify-center flex-1">
        <ul className="flex flex-row items-center gap-4">
          <li>
            <Link href="/registry">{t('header.registry')}</Link>
          </li>
          <li>
            <Link href="/about">{t('header.about')}</Link>
          </li>
          <li>
            <Link href="/contact">{t('header.contact')}</Link>
          </li>
        </ul>
      </nav>
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
