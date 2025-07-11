import { Header } from '@/components/Header'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

import { Footer } from '@/components/Footer'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Inter } from 'next/font/google'
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

export default async function RootLayout(props: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const params = await props.params

  if (!hasLocale(routing.locales, params.locale)) {
    notFound()
  }

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <head />
      <body className={cn([inter.className, 'min-h-screen', 'flex-col'])}>
        <NextIntlClientProvider>
          <ThemeProvider
            attribute={['class', 'data-theme']}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <div>
              <main>{props.children}</main>
            </div>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
