'use client'

import { ActionState } from '@/types/action-state'
import { useActionState } from 'react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { SignUpFormValues } from '@/lib/validation/signup-form.schema'
import { useTranslations } from 'next-intl'

type SignupFormProps = {
  action: (
    initialState: ActionState<SignUpFormValues>,
    formData: FormData,
  ) => Promise<ActionState<SignUpFormValues>>
  values: SignUpFormValues
}

export function SignupForm({ action, values }: SignupFormProps) {
  const t = useTranslations('SignUpForm')
  const [state, formAction, isPending] = useActionState(action, {
    values,
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
          required
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
          required
        />
        {state.errors.password && (
          <p role="alert" className="text-red-500">
            {state.errors.password.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">{t('confirmPassword')}</label>
        <input
          name="confirm_password"
          type="password"
          placeholder="not12345678"
          className="p-2 border rounded-lg"
          defaultValue={state.values.confirm_password}
          required
        />
        {state.errors.confirm_password && (
          <p role="alert" className="text-red-500">
            {state.errors.confirm_password.message}
          </p>
        )}
      </div>

      <fieldset className="p-4 border rounded-md">
        <legend className="px-2 text-sm font-semibold ">{t('terms')}</legend>

        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <input name="agreeToTerms" type="checkbox" required />
            <label>{t('acceptTerms')}</label>
          </div>
          <p className="text-sm text-gray-500">{t('acceptTermsDescription')}</p>
        </div>
        {state.errors.agreeToTerms && (
          <p role="alert" className="text-red-500">
            {state.errors.agreeToTerms.message}
          </p>
        )}
      </fieldset>

      <div>
        <button type="submit" className="px-4 py-2 text-white bg-black rounded-md">
          {isPending ? <LoadingSpinner /> : t('submit')}
        </button>
      </div>
    </form>
  )
}
