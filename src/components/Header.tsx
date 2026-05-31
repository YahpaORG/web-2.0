'use server'
import { Link } from '@/i18n/navigation'
import { getUser } from '@/lib/server/get-user.action'
import { getTranslations } from 'next-intl/server'
import LocaleSwitcher from './LocaleSwitcher'
import { YahpaLogo } from './Logo'
import { NavigationMenuDesktop } from './Nav'
import { NavSheet } from './NavSheet'
import { ThemeDropdown } from './ThemeDropdown'
import { UserMenu } from './UserMenu'

export async function Header() {
  const user = await getUser()
  const t = await getTranslations()
  const isAuth = !!user

  const navSections = [
    {
      label: null,
      links: [
        { href: '/', label: t('Header.home') },
        { href: '/about', label: t('Header.about') },
        { href: '/projects', label: t('Header.projects') },
        { href: '/contact', label: t('Header.contact') },
      ],
    },
    {
      label: t('Header.registry.title'),
      links: [
        { href: '/registry/search', label: t('Header.registry.search.title') },
        { href: '/registry', label: t('Header.registry.about.title') },
      ],
    },
    {
      label: t('Header.news.title'),
      links: [
        { href: '/#latest', label: t('Header.news.latest.title') },
        { href: '/', label: t('Header.news.events.title') },
      ],
    },
  ]

  return (
    <header className="flex items-center justify-between m-3 xl:m-6">
      <YahpaLogo />
      <div className="flex-row justify-center flex-1 hidden w-full xl:flex">
        <NavigationMenuDesktop />
      </div>
      <div className="justify-end flex-1 hidden xl:flex">
        <ul className="flex flex-row items-center gap-2">
          <li>
            <UserMenu isAuth={isAuth} />
          </li>
          <li>
            <LocaleSwitcher />
          </li>
          <li>
            <ThemeDropdown />
          </li>
        </ul>
      </div>
      <div className="flex xl:hidden">
        <NavSheet isAuth={isAuth} sections={navSections} />
      </div>
    </header>
  )
}