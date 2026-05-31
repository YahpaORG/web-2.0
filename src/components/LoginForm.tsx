'use client'
import { loginUser } from '@/lib/server/login-user.action'
import { useActionState } from 'react'
import { LoadingSpinner } from './ui/LoadingSpinner'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Button } from './ui/button'

export function LoginForm() {
  const t = useTranslations('LoginForm')
  const [state, formAction, isPending] = useActionState(loginUser, {
    values: { email: '', password: '' },
    errors: {},
  })

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.errors.api && (
        <p role="alert" className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg p-3">
          {state.errors.api.message}
        </p>
      )}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('email')}</label>
        <input
          name="email"
          type="email"
          placeholder={t('email')}
          className="p-2.5 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          defaultValue={state.values.email}
        />
        {state.errors.email && (
          <p role="alert" className="text-xs text-red-500">{state.errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('password')}</label>
        <input
          name="password"
          type="password"
          placeholder={t('password')}
          className="p-2.5 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          defaultValue={state.values.password}
        />
        {state.errors.password && (
          <p role="alert" className="text-xs text-red-500">{state.errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full mt-2" disabled={isPending}>
        {isPending ? <LoadingSpinner /> : t('submit')}
      </Button>
      <p className="text-sm text-center text-muted-foreground">
        {t.rich('createAccount', {
          link: (chunks) => (
            <Link href="/signup" className="underline text-foreground hover:text-primary">
              {chunks}
            </Link>
          ),
        })}
      </p>
    </form>
  )
}