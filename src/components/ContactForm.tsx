'use client'
import { ContactFormValues } from '@/lib/validation/contact-form.schema'
import { ActionState } from '@/types/action-state'
import { useActionState } from 'react'
import { LoadingSpinner } from './ui/LoadingSpinner'
import { useTranslations } from 'next-intl'
import { Button } from './ui/button'

type ContactFormProps = {
  action: (
    initialState: ActionState<ContactFormValues>,
    formData: FormData,
  ) => Promise<ActionState<ContactFormValues>>
  values: ContactFormValues
}

export function ContactForm({ action, values }: ContactFormProps) {
  const t = useTranslations('contact')
  const [state, formAction, isPending] = useActionState(action, {
    values,
    errors: {},
  })

  const REASONS = [
    { label: t('form.reasons.general'), value: 'general' },
    { label: t('form.reasons.contact'), value: 'contact' },
    { label: t('form.reasons.sponsor'), value: 'sponsor' },
  ]

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {t('form.title')}
        </h2>
      </div>

      {state.errors.complete && (
        <p role="alert" className="text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg p-3">
          {state.errors.complete.message}
        </p>
      )}
      {state.errors.api && (
        <p role="alert" className="text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg p-3">
          {state.errors.api.message}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.name')}</label>
        <input
          name="name"
          type="text"
          placeholder={t('form.name')}
          className="p-2.5 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          defaultValue={state.values.name}
          required
        />
        {state.errors.name && (
          <p role="alert" className="text-xs text-red-500">{state.errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.email')}</label>
        <input
          name="email"
          type="email"
          placeholder={t('form.email')}
          className="p-2.5 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          defaultValue={state.values.email}
          required
        />
        {state.errors.email && (
          <p role="alert" className="text-xs text-red-500">{state.errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.reason')}</label>
        <p className="text-xs text-muted-foreground">{t('form.reason_description')}</p>
        <select
          name="reason"
          className="p-2.5 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          defaultValue={state.values.reason}
          required
        >
          <option value="" disabled>{t('form.reason')}</option>
          {REASONS.map((reason) => (
            <option key={reason.value} value={reason.value}>
              {reason.label}
            </option>
          ))}
        </select>
        {state.errors.reason && (
          <p role="alert" className="text-xs text-red-500">{state.errors.reason.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.message')}</label>
        <p className="text-xs text-muted-foreground">{t('form.message_description')}</p>
        <textarea
          name="message"
          maxLength={500}
          className="p-2.5 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-40 resize-none"
          placeholder={t('form.message_placeholder')}
          required
          minLength={1}
        />
        {state.errors.message && (
          <p role="alert" className="text-xs text-red-500">{state.errors.message.message}</p>
        )}
      </div>

      <div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <LoadingSpinner /> : t('form.submit')}
        </Button>
      </div>
    </form>
  )
}