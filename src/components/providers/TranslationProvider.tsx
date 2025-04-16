'use client'

import type { Translation } from '@/lib/get-translations'
import { useContext, createContext, PropsWithChildren } from 'react'
import type { Locale } from '@/translations/i18n-config'

type TranslateContextProps = {
  currentLocale: Locale
  translation: Translation
}

type TranslationProviderProps = PropsWithChildren<TranslateContextProps>

const TranslationContext = createContext<TranslateContextProps | null>(null)

export default function TranslationProvider({
  translation,
  currentLocale,
  children,
}: TranslationProviderProps) {
  return (
    <TranslationContext.Provider value={{ translation, currentLocale }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)

  if (!context) {
    throw new Error('useTranslation hook must be used within TranslationProvider')
  }

  return { t: context.translation, currentLocale: context.currentLocale }
}
