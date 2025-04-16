import { Header } from '@/components/Header'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const { locale } = await params
  //@ts-ignore
  const t = await getTranslations({ locale, namespace: 'seo' })

  return {
    title: t('title'),
  }
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout(props: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const params = await props.params

  if (!hasLocale(routing.locales, params.locale)) {
    notFound()
  }

  const t = await getTranslations()

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <head />
      <body className={cn([inter.className, 'flex', 'min-h-screen', 'flex-col'])}>
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <div className="flex flex-1">
              <main className="flex-1">{props.children}</main>
            </div>
            <footer className="flex flex-col items-center justify-center p-4 bg-neutral-900">
              <span className="mb-2 text-white">{t('footer.rights')}</span>

              <Link href="/admin" className="text-sm text-white hover:underline">
                {t('footer.admin')}
              </Link>
            </footer>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
