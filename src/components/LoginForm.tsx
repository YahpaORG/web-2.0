'use client'

import { loginUser } from '@/lib/server/login-user.action'
import { useActionState } from 'react'
import { LoadingSpinner } from './ui/LoadingSpinner'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export function LoginForm() {
  const t = useTranslations('LoginForm')
  const [state, formAction, isPending] = useActionState(loginUser, {
    values: {
      email: '',
      password: '',
    },
    errors: {},
  })

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.errors.api && (
        <p role="alert" className="text-red-500">
          {state.errors.api.message}
        </p>
      )}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">{t('email')}</label>
        <input
          name="email"
          type="email"
          placeholder="jimmy.choo@gmail.com"
          className="p-2 border rounded-lg"
          defaultValue={state.values.email}
        />
        {state.errors.email && (
          <p role="alert" className="text-red-500">
            {state.errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">{t('password')}</label>
        <input
          name="password"
          type="password"
          placeholder="not12345678"
          className="p-2 border rounded-lg"
          defaultValue={state.values.password}
        />
        {state.errors.password && (
          <p role="alert" className="text-red-500">
            {state.errors.password.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm">
          {t.rich('createAccount', {
            link: (chunks) => (
              <Link href="/signup" className="underline">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>
      <div>
        <button type="submit" className="px-4 py-2 text-white bg-black rounded-md">
          {isPending ? <LoadingSpinner /> : t('submit')}
        </button>
      </div>
    </form>
  )
}
