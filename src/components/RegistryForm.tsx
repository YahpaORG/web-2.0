'use client'

import {
  CONTACT_METHODS,
  JOB_STATUS,
  ORDERS,
  PATIENT_OPTIONS,
  PROFESSIONS,
  RegistryFormValues,
  SECTORS,
} from '@/lib/validation/registry-form.schema'
import { Language } from '@/payload/payload-types'
import { ActionState } from '@/types/action-state'
import { useActionState } from 'react'
import { LoadingSpinner } from './ui/LoadingSpinner'
import { useTranslations } from 'next-intl'

type RegistrySignupFormProps = {
  languages: Language[]
  action: (
    initialState: ActionState<RegistryFormValues>,
    formData: FormData,
  ) => Promise<ActionState<RegistryFormValues>>
  values: RegistryFormValues
}

export function CreateRegistryForm({ languages, action, values }: RegistrySignupFormProps) {
  const t = useTranslations('RegistryForm')
  const [state, formAction, isPending] = useActionState(action, {
    values,
    errors: {},
  })

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {state.errors.api && (
        <p role="alert" className="text-red-500">
          {state.errors.api.message}
        </p>
      )}

      {/* Personal Info */}
      <section className="flex flex-col gap-6">
        <div>
          <h4 className="p-0 m-0 text-xl font-medium">{t('personalInfo')}</h4>
          <p className="text-sm">{t('personalInfoDescription')}</p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">{t('firstName')}</label>
          <input
            name="firstName"
            type="text"
            placeholder="Jimmy"
            className="p-2 border rounded-lg"
            defaultValue={state.values.firstName}
            required
          />
          {state.errors.firstName && (
            <p role="alert" className="text-red-500">{state.errors.firstName.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">{t('lastName')}</label>
          <input
            name="lastName"
            type="text"
            placeholder="Choo"
            className="p-2 border rounded-lg"
            defaultValue={state.values.lastName}
            required
          />
          {state.errors.lastName && (
            <p role="alert" className="text-red-500">{state.errors.lastName.message}</p>
          )}
        </div>
        <fieldset className="border rounded-md">
          <legend className="px-2 ml-4 text-sm font-semibold">{t('fluentLanguages')}</legend>
          <ul className="flex flex-row flex-wrap m-4">
            {languages.map((option) => (
              <li key={option.id} className="w-full max-w-[10rem]">
                <label className="flex items-center whitespace-nowrap cursor-pointer max-w-[200px] px-2 py-1 transition-colors hover:bg-gray-100 [&:has(input:checked)]:bg-gray-200">
                  <input
                    type="checkbox"
                    name="languages"
                    value={option.id}
                    className="cursor-pointer"
                    defaultChecked={state.values.languages?.includes(option.id)}
                  />
                  <span className="ml-2">{option.autonym}</span>
                </label>
              </li>
            ))}
          </ul>
          {state.errors.languages && (
            <p role="alert" className="text-red-500">{state.errors.languages.message}</p>
          )}
        </fieldset>
      </section>

      {/* Contact Info */}
      <section className="flex flex-col gap-6">
        <div>
          <h4 className="p-0 m-0 text-xl font-medium">{t('contactPreferences')}</h4>
          <p className="text-sm">{t('contactPreferencesDescription')}</p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">{t('email')}</label>
          <input
            name="email"
            disabled
            type="email"
            placeholder="Your email"
            className="p-2 border rounded-lg"
            defaultValue={state.values.email}
            required
          />
          {state.errors.email && (
            <p role="alert" className="text-red-500">{state.errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">{t('phoneNumber')}</label>
          <input
            name="primaryPhoneNumber"
            type="tel"
            placeholder="(514) 123-4567"
            className="p-2 border rounded-lg"
            defaultValue={state.values.primaryPhoneNumber}
            required
          />
          {state.errors.primaryPhoneNumber && (
            <p role="alert" className="text-red-500">{state.errors.primaryPhoneNumber.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">{t('website')}</label>
          <input
            name="website"
            type="url"
            placeholder="https://yourwebsite.com"
            className="p-2 border rounded-lg"
            defaultValue={state.values.website ?? ''}
          />
          {state.errors.website && (
            <p role="alert" className="text-red-500">{state.errors.website.message}</p>
          )}
        </div>
        <fieldset className="p-4 border rounded-md">
          <legend className="px-2 text-sm font-semibold">{t('contactMethod.legend')}</legend>
          {CONTACT_METHODS.map((method) => (
            <div key={method.value} className="flex flex-row items-center gap-2">
              <input
                name="preferredContactMethod"
                type="radio"
                defaultChecked={state.values.preferredContactMethod === method.value}
                value={method.value}
                required
              />
              <label>{t(`contactMethod.${method.value}`)}</label>
            </div>
          ))}
          {state.errors.preferredContactMethod && (
            <p role="alert" className="text-red-500">{state.errors.preferredContactMethod.message}</p>
          )}
        </fieldset>
      </section>

      {/* Practice Info */}
      <section className="flex flex-col gap-6">
        <div>
          <h4 className="p-0 m-0 text-xl font-medium">{t('practiceInfo.title')}</h4>
          <p className="text-sm">{t('practiceInfo.description')}</p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">{t('practiceInfo.name')}</label>
          <input
            name="practiceInfo.name"
            type="text"
            placeholder="Montreal General Hospital"
            className="p-2 border rounded-lg"
            defaultValue={state.values.practiceInfo?.name}
            required
          />
          {state.errors['practiceInfo.name'] && (
            <p role="alert" className="text-red-500">{state.errors['practiceInfo.name'].message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">{t('practiceInfo.address')}</label>
          <input
            name="practiceInfo.address"
            type="text"
            placeholder="1234 Rue Sainte-Catherine"
            className="p-2 border rounded-lg"
            defaultValue={state.values.practiceInfo?.address}
            required
          />
          {state.errors['practiceInfo.address'] && (
            <p role="alert" className="text-red-500">{state.errors['practiceInfo.address'].message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">{t('practiceInfo.email')}</label>
          <input
            name="practiceInfo.email"
            type="email"
            placeholder="clinic@example.com"
            className="p-2 border rounded-lg"
            defaultValue={state.values.practiceInfo?.email ?? ''}
          />
          {state.errors['practiceInfo.email'] && (
            <p role="alert" className="text-red-500">{state.errors['practiceInfo.email'].message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">{t('practiceInfo.phone')}</label>
          <input
            name="practiceInfo.phone"
            type="tel"
            placeholder="(514) 123-4567"
            className="p-2 border rounded-lg"
            defaultValue={state.values.practiceInfo?.phone ?? ''}
          />
          {state.errors['practiceInfo.phone'] && (
            <p role="alert" className="text-red-500">{state.errors['practiceInfo.phone'].message}</p>
          )}
        </div>
      </section>

      {/* Professional Info */}
      <section className="flex flex-col gap-6">
        <div>
          <h4 className="p-0 m-0 text-xl font-medium">{t('professionalInfo')}</h4>
          <p className="text-sm">{t('professionalInfoDescription')}</p>
        </div>
        <fieldset className="p-4 border rounded-md">
          <legend className="px-2 text-sm font-semibold">{t('jobStatus.legend')}</legend>
          {JOB_STATUS.map((status) => (
            <div key={status.value} className="flex flex-row items-center gap-2">
              <input
                name="jobStatus"
                type="radio"
                defaultChecked={state.values.jobStatus === status.value}
                value={status.value}
                required
              />
              <label>{t(`jobStatus.${status.value}`)}</label>
            </div>
          ))}
          {state.errors.jobStatus && (
            <p role="alert" className="text-red-500">{state.errors.jobStatus.message}</p>
          )}
        </fieldset>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">{t('jobTitle.label')}</label>
          <p className="text-sm text-gray-500">{t('jobTitle.description')}</p>
          <select
            name="profession"
            className="p-2 border rounded-lg max-w-[15rem]"
            defaultValue={state.values.profession ?? 'default'}
            required
          >
            <option value="default" disabled>{t('jobTitle.defaultOption')}</option>
            {PROFESSIONS.map((profession) => (
              <option key={profession.value} value={profession.value}>
                {profession.label}
              </option>
            ))}
          </select>
          {state.errors.profession && (
            <p role="alert" className="text-red-500">{state.errors.profession.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">{t('specialty.label')}</label>
          <p className="text-sm text-gray-500">{t('specialty.description')}</p>
          <input
            name="specialty"
            type="text"
            placeholder={t('specialty.placeholder')}
            className="p-2 border rounded-lg"
            defaultValue={state.values.specialty ?? ''}
          />
          {state.errors.specialty && (
            <p role="alert" className="text-red-500">{state.errors.specialty.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">{t('order.label')}</label>
          <p className="text-sm text-gray-500">{t('order.description')}</p>
          <select
            name="professionalOrder"
            className="p-2 border rounded-lg"
            defaultValue={state.values.professionalOrder ?? 'default'}
            required
          >
            <option value="default" disabled>{t('order.defaultOption')}</option>
            {ORDERS.map((order) => (
              <option key={order.value} value={order.value}>
                {order.label}
              </option>
            ))}
          </select>
          {state.errors.professionalOrder && (
            <p role="alert" className="text-red-500">{state.errors.professionalOrder.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">{t('graduationDate.label')}</label>
          <p className="text-sm text-gray-500">{t('graduationDate.description')}</p>
          <input
            name="graduationDate"
            type="date"
            className="p-2 border rounded-lg max-w-[15rem]"
            defaultValue={state.values.graduationDate ?? ''}
          />
          {state.errors.graduationDate && (
            <p role="alert" className="text-red-500">{state.errors.graduationDate.message}</p>
          )}
        </div>
        <fieldset className="p-4 border rounded-md">
          <legend className="px-2 text-sm font-semibold">{t('sector.legend')}</legend>
          {SECTORS.map((sector) => (
            <div key={sector.value} className="flex flex-row items-center gap-2">
              <input
                name="sector"
                type="radio"
                defaultChecked={state.values.sector === sector.value}
                value={sector.value}
              />
              <label>{t(`sector.${sector.value}`)}</label>
            </div>
          ))}
          {state.errors.sector && (
            <p role="alert" className="text-red-500">{state.errors.sector.message}</p>
          )}
        </fieldset>
        <fieldset className="p-4 border rounded-md">
          <legend className="px-2 text-sm font-semibold">{t('newPatients.label')}</legend>
          {PATIENT_OPTIONS.map((option) => (
            <div key={option.value} className="flex flex-row items-center gap-2">
              <input
                name="isAcceptingPatients"
                type="radio"
                defaultChecked={state.values.isAcceptingPatients === option.value}
                value={option.value}
              />
              <label>{t(`newPatients.${option.value}`)}</label>
            </div>
          ))}
          {state.errors.isAcceptingPatients && (
            <p role="alert" className="text-red-500">{state.errors.isAcceptingPatients.message}</p>
          )}
        </fieldset>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">{t('newPatientAcceptanceDate.label')}</label>
          <p className="text-sm text-gray-500">{t('newPatientAcceptanceDate.description')}</p>
          <input
            name="newPatientAcceptanceDate"
            type="date"
            className="p-2 border rounded-lg max-w-[15rem]"
            defaultValue={state.values.newPatientAcceptanceDate ?? ''}
          />
          {state.errors.newPatientAcceptanceDate && (
            <p role="alert" className="text-red-500">
              {state.errors.newPatientAcceptanceDate.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">{t('licenseNumber.label')}</label>
          <p className="text-sm text-gray-500">{t('licenseNumber.description')}</p>
          <input
            name="licenseNumber"
            type="text"
            className="p-2 border rounded-lg max-w-[15rem]"
            defaultValue={state.values.licenseNumber ?? ''}
            required
          />
          {state.errors.licenseNumber && (
            <p role="alert" className="text-red-500">{state.errors.licenseNumber.message}</p>
          )}
        </div>
      </section>

      {/* Consent */}
      <section className="flex flex-col gap-6">
        <div>
          <h4 className="p-0 m-0 text-xl font-medium">{t('consent')}</h4>
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              name="consentToWebsite"
              type="checkbox"
              defaultChecked={state.values.consentToWebsite === true}
              required
            />
            <span className="text-sm font-semibold">{t('consentToWebsite.label')}</span>
          </label>
          <p className="text-sm text-gray-500">{t('consentToWebsite.description')}</p>
          {state.errors.consentToWebsite && (
            <p role="alert" className="text-red-500">{state.errors.consentToWebsite.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              name="consentToReferrals"
              type="checkbox"
              defaultChecked={state.values.consentToReferrals === true}
            />
            <span className="text-sm font-semibold">{t('consentToReferrals.label')}</span>
          </label>
          <p className="text-sm text-gray-500">{t('consentToReferrals.description')}</p>
          {state.errors.consentToReferrals && (
            <p role="alert" className="text-red-500">{state.errors.consentToReferrals.message}</p>
          )}
        </div>
      </section>

      {Object.keys(state.errors).length > 0 && (
        <p className="text-red-500">{t('formErrors.hasErrors')}</p>
      )}
      <div>
        <button type="submit" className="px-4 py-2 text-white bg-black rounded-md">
          {isPending ? <LoadingSpinner /> : t('submit')}
        </button>
      </div>
    </form>
  )
}