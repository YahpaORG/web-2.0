import { Locale } from '@/translations/i18n-config'

export type PageProps = {
  params: Promise<{ slug: string; lang: Locale }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
