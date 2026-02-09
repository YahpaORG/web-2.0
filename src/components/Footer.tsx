import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { YahpaLogo } from './Logo'

export async function Footer() {
  const t = await getTranslations('Footer')

  const menuItems = [
    {
      title: t('general.title'),
      links: [
        { url: '/about', text: t('general.about') },
        { url: '/contact', text: t('general.contact') },
        { url: '/projects', text: t('general.projects') },
      ],
    },
    {
      title: t('registry.title'),
      links: [
        { url: '/registry/search', text: t('registry.search') },
        { url: '/registry', text: t('registry.about') },
      ],
    },
    {
      title: t('news.title'),
      links: [
        { url: '/#latest', text: t('news.latest') },
        { url: '/events', text: t('news.past') },
      ],
    },
    {
      title: t('admin.title'),
      links: [{ url: '/admin', text: t('admin.portal') }],
    },
  ]

  return (
    <section className="px-6 py-8">

        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6 container">
            <div className="col-span-2 mb-8 lg:mb-0">
              <YahpaLogo />
            </div>

            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="font-medium hover:text-primary">
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-between gap-4 pt-8 mt-24 text-sm font-medium border-t text-muted-foreground md:flex-row md:items-center">
            <p>{t('rights')}</p>
            <ul className="flex gap-4">
              <li className="underline hover:text-primary">
                <Link href="#">{t('terms')}</Link>
              </li>
              <li className="underline hover:text-primary">
                <Link href="#">{t('privacy')}</Link>
              </li>
            </ul>
          </div>
        </footer>

    </section>
  )
}
