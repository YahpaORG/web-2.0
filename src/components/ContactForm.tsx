'use client'

import { ContactFormValues } from '@/lib/validation/contact-form.schema'
import { ActionState } from '@/types/action-state'
import { useActionState } from 'react'
import { LoadingSpinner } from './ui/LoadingSpinner'
import { useTranslations } from 'next-intl'

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
    <form action={formAction} className="max-w-md space-y-4">
      <div className="max-w-md">
        <h3 className="font-medium">{t('form.title')}</h3>
      </div>
      {state.errors.complete && (
        <p role="alert" className="text-green-500">
          {state.errors.complete.message}
        </p>
      )}
      {state.errors.api && (
        <p role="alert" className="text-red-500">
          {state.errors.api.message}
        </p>
      )}
      <div className="flex flex-col gap-2 max-w-[16rem]">
        <label className="text-sm font-semibold">{t('form.name')}</label>
        <input
          name="name"
          type="text"
          placeholder="Jimmy Choo"
          className="p-2 border rounded-lg"
          defaultValue={state.values.name}
          required
        />
        {state.errors.name && (
          <p role="alert" className="text-red-500">
            {state.errors.name.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2 max-w-[16rem]">
        <label className="text-sm font-semibold">{t('form.email')}</label>
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
      <div className="flex flex-col mb-4">
        <label className="text-sm font-semibold">{t('form.reason')}</label>
        <p className="mb-2 text-sm text-gray-500">{t('form.reason_description')}</p>
        <select
          name="reason"
          className="p-2 border rounded-lg"
          defaultValue={state.values.reason}
          required
        >
          {REASONS.map((reason) => (
            <option key={reason.label} value={reason.value}>
              {reason.label}
            </option>
          ))}
        </select>
        {state.errors.reason && (
          <p role="alert" className="text-red-500">
            {state.errors.reason.message}
          </p>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <label className="text-sm font-semibold">{t('form.message')}</label>
        <p className="mb-2 text-sm text-gray-500">{t('form.message_description')}</p>
        <textarea
          name="message"
          maxLength={500}
          className="p-2 border rounded-lg min-h-[10rem]"
          placeholder={t('form.message_placeholder')}
          required
          minLength={1}
        />
        {state.errors.message && (
          <p role="alert" className="text-red-500">
            {state.errors.message.message}
          </p>
        )}
      </div>

      <div className="mt-8">
        <button type="submit" className="px-4 py-2 text-white bg-black rounded-md">
          {isPending ? <LoadingSpinner /> : t('form.submit')}
        </button>
      </div>
    </form>
  )
}
