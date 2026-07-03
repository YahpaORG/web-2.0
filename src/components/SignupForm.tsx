'use client'
import { ActionState } from '@/types/action-state'
import { useActionState } from 'react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { SignUpFormValues } from '@/lib/validation/signup-form.schema'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

type SignupFormProps = {
  action: (
    initialState: ActionState<SignUpFormValues>,
    formData: FormData,
  ) => Promise<ActionState<SignUpFormValues>>
  values: SignUpFormValues
}

const inputClass = 'p-2.5 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full'

export function SignupForm({ action, values }: SignupFormProps) {
  const t = useTranslations('SignUpForm')
  const [state, formAction, isPending] = useActionState(action, {
    values,
    errors: {},
  })

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.errors.api && (
        <p role="alert" className="text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg p-3">
          {state.errors.api.message}
        </p>
      )}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('email')}</label>
        <input
          name="email"
          type="email"
          placeholder={t('email')}
          className={`${inputClass} ${state.errors.email ? 'border-red-500' : ''}`}
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
          className={`${inputClass} ${state.errors.password ? 'border-red-500' : ''}`}
          defaultValue={state.values.password}
        />
        {state.errors.password && (
          <p role="alert" className="text-xs text-red-500">{state.errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('confirmPassword')}</label>
        <input
          name="confirm_password"
          type="password"
          placeholder={t('confirmPassword')}
          className={`${inputClass} ${state.errors.confirm_password ? 'border-red-500' : ''}`}
          defaultValue={state.values.confirm_password}
        />
        {state.errors.confirm_password && (
          <p role="alert" className="text-xs text-red-500">{state.errors.confirm_password.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            name="agreeToTerms"
            type="checkbox"
            className="mt-0.5 accent-primary"
            defaultChecked={state.values.agreeToTerms === true}
          />
          <span className="text-sm font-medium">{t('acceptTerms')}</span>
        </label>
        <p className="text-xs text-muted-foreground ml-5">{t('acceptTermsDescription')}</p>
        {state.errors.agreeToTerms && (
          <p role="alert" className="text-xs text-red-500">{state.errors.agreeToTerms.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full mt-2" disabled={isPending}>
        {isPending ? <LoadingSpinner /> : t('submit')}
      </Button>
    </form>
  )
}