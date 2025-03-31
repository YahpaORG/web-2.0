'use client'

import { loginUser } from '@/lib/server/login-user.action'
import { useActionState } from 'react'
import { LoadingSpinner } from './ui/LoadingSpinner'
import Link from 'next/link'

export function LoginForm() {
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
        <label className="text-sm font-semibold">Email</label>
        <input
          name="email"
          type="email"
          placeholder="jimmy.choo@gmail.com"
          className="p-2 border rounded-lg"
          defaultValue={state.values.email}
          required
        />
        {state.errors.email && (
          <p role="alert" className="text-red-500">
            {state.errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Password</label>
        <input
          name="password"
          type="password"
          placeholder="not12345678"
          className="p-2 border rounded-lg"
          defaultValue={state.values.password}
          required
        />
        {state.errors.password && (
          <p role="alert" className="text-red-500">
            {state.errors.password.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="underline">
            Sign up here.
          </Link>
        </p>
      </div>
      <div>
        <button type="submit" className="px-4 py-2 text-white bg-black rounded-md">
          {isPending ? <LoadingSpinner /> : 'Login'}
        </button>
      </div>
    </form>
  )
}
