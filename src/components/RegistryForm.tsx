'use client'

import {
  CONTACT_METHODS,
  JOB_STATUS,
  ORDERS,
  PATIENT_OPTIONS,
  PROFESSIONS,
  RegistryFormSchema,
  RegistryFormValues,
  SECTORS,
} from '@/lib/validation/registry-form.schema'
import { Language } from '@/payload/payload-types'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useState } from 'react'
import { LoadingSpinner } from './ui/LoadingSpinner'
import { Button } from './ui/button'
import { createRegistryForm } from '@/lib/server/create-registry-form.action'

type RegistrySignupFormProps = {
  languages: Language[]
  values: RegistryFormValues
}

function Required() {
  return <span className="text-red-500 ml-0.5">*</span>
}

function Optional({ label }: { label: string }) {
  return <span className="ml-1 text-xs font-normal text-muted-foreground">({label})</span>
}

const inputClass = 'p-2.5 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring'
const errorInputClass = 'border-red-500'

export function CreateRegistryForm({ languages, values }: RegistrySignupFormProps) {
  const t = useTranslations('RegistryForm')
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistryFormValues>({
    resolver: standardSchemaResolver(RegistryFormSchema),
    defaultValues: values,
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  })

  const onSubmit = async (data: RegistryFormValues) => {
    setApiError(null)
    const result = await createRegistryForm(data)
    if (result?.errors?.api) {
      setApiError(result.errors.api.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      <p className="text-xs text-muted-foreground">
        {t('requiredNote')} <span className="text-red-500">*</span>
      </p>

      {apiError && (
        <p role="alert" className="text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg p-3">
          {apiError}
        </p>
      )}

      {/* Personal Info */}
      <section className="flex flex-col gap-4">
        <div>
          <h4 className="p-0 m-0 text-xl font-medium">{t('personalInfo')}</h4>
          <p className="text-sm text-muted-foreground">{t('personalInfoDescription')}</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">
            {t('firstName')}<Required />
          </label>
          <input
            {...register('firstName')}
            type="text"
            placeholder={t('firstName')}
            className={`${inputClass} ${errors.firstName ? errorInputClass : ''}`}
          />
          {errors.firstName && (
            <p role="alert" className="text-xs text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">
            {t('lastName')}<Required />
          </label>
          <input
            {...register('lastName')}
            type="text"
            placeholder={t('lastName')}
            className={`${inputClass} ${errors.lastName ? errorInputClass : ''}`}
          />
          {errors.lastName && (
            <p role="alert" className="text-xs text-red-500">{errors.lastName.message}</p>
          )}
        </div>
        <fieldset className={`border rounded-lg ${errors.languages ? 'border-red-500' : ''}`}>
          <legend className="px-2 ml-4 text-sm font-medium">
            {t('fluentLanguages')}<Required />
          </legend>
          <ul className="flex flex-row flex-wrap m-4">
            {languages.map((option) => (
              <li key={option.id} className="w-full max-w-[10rem]">
                <label className="flex items-center whitespace-nowrap cursor-pointer max-w-[200px] px-2 py-1 m-0.5 transition-colors hover:bg-muted rounded has-[:checked]:bg-muted">
                  <input
                    {...register('languages')}
                    type="checkbox"
                    value={option.id}
                    className="cursor-pointer accent-primary"
                  />
                  <span className="ml-2 text-sm">{option.autonym}</span>
                </label>
              </li>
            ))}
          </ul>
          {errors.languages && (
            <p role="alert" className="text-xs text-red-500 m-4 mt-0">{errors.languages.message}</p>
          )}
        </fieldset>
      </section>

      {/* Contact Info */}
      <section className="flex flex-col gap-4">
        <div>
          <h4 className="p-0 m-0 text-xl font-medium">{t('contactPreferences')}</h4>
          <p className="text-sm text-muted-foreground">{t('contactPreferencesDescription')}</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">{t('email')}</label>
          <input
            {...register('email')}
            disabled
            type="email"
            className={`${inputClass} opacity-60`}
          />
          {errors.email && (
            <p role="alert" className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">
            {t('phoneNumber')}
            <Optional label={t('optional')} />
          </label>
          <input
            {...register('primaryPhoneNumber')}
            type="tel"
            placeholder="(514) 123-4567"
            className={`${inputClass} ${errors.primaryPhoneNumber ? errorInputClass : ''}`}
          />
          {errors.primaryPhoneNumber && (
            <p role="alert" className="text-xs text-red-500">{errors.primaryPhoneNumber.message}</p>
          )}
        </div>
        <fieldset className="p-4 border rounded-lg">
          <legend className="px-2 text-sm font-medium">
            {t('contactMethod.legend')}
            <Optional label={t('optional')} />
          </legend>
          {CONTACT_METHODS.map((method) => (
            <label
              key={method.value}
              className="flex flex-row items-center gap-2 py-1 cursor-pointer hover:bg-muted rounded px-2 my-0.5 has-[:checked]:bg-muted"
            >
              <input
                {...register('preferredContactMethod')}
                type="radio"
                value={method.value}
                className="accent-primary"
              />
              <span className="text-sm">{t(`contactMethod.${method.value}`)}</span>
            </label>
          ))}
          {errors.preferredContactMethod && (
            <p role="alert" className="text-xs text-red-500 mt-2">{errors.preferredContactMethod.message}</p>
          )}
        </fieldset>
      </section>

      {/* Practice Info */}
      <section className="flex flex-col gap-4">
        <div>
          <h4 className="p-0 m-0 text-xl font-medium">
            {t('practiceInfoSection')}
            <Optional label={t('optional')} />
          </h4>
          <p className="text-sm text-muted-foreground">{t('practiceInfoSectionDescription')}</p>
        </div>
        {errors.practiceInfo && (
          <p className="text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg p-3">
            {errors.practiceInfo.message}
          </p>
        )}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">{t('practiceInfo.name')}</label>
          <input
            {...register('practiceInfo.name')}
            type="text"
            placeholder={t('practiceInfo.name')}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">{t('practiceInfo.address')}</label>
          <input
            {...register('practiceInfo.address')}
            type="text"
            placeholder={t('practiceInfo.address')}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">{t('practiceInfo.email')}</label>
          <input
            {...register('practiceInfo.email')}
            type="email"
            placeholder={t('practiceInfo.email')}
            className={`${inputClass} ${errors.practiceInfo?.email ? errorInputClass : ''}`}
          />
          {errors.practiceInfo?.email && (
            <p role="alert" className="text-xs text-red-500">{errors.practiceInfo.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">{t('practiceInfo.phone')}</label>
          <input
            {...register('practiceInfo.phone')}
            type="tel"
            placeholder="(514) 123-4567"
            className={`${inputClass} ${errors.practiceInfo?.phone ? errorInputClass : ''}`}
          />
          {errors.practiceInfo?.phone && (
            <p role="alert" className="text-xs text-red-500">{errors.practiceInfo.phone.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">
            {t('website')}
            <Optional label={t('optional')} />
          </label>
          <input
            {...register('practiceInfo.website')}
            type="url"
            placeholder="https://yourwebsite.com"
            className={`${inputClass} ${errors.practiceInfo?.website ? errorInputClass : ''}`}
          />
          {errors.practiceInfo?.website && (
            <p role="alert" className="text-xs text-red-500">{errors.practiceInfo?.website.message}</p>
          )}
        </div>
      </section>

      {/* Professional Info */}
      <section className="flex flex-col gap-4">
        <div>
          <h4 className="p-0 m-0 text-xl font-medium">{t('professionalInfo')}</h4>
          <p className="text-sm text-muted-foreground">{t('professionalInfoDescription')}</p>
        </div>
        <fieldset className={`p-4 border rounded-lg ${errors.jobStatus ? 'border-red-500' : ''}`}>
          <legend className="px-2 text-sm font-medium">
            {t('jobStatus.legend')}<Required />
          </legend>
          {JOB_STATUS.map((status) => (
            <label
              key={status.value}
              className="flex flex-row items-center gap-2 py-1 cursor-pointer hover:bg-muted rounded px-2 my-0.5 has-[:checked]:bg-muted"
            >
              <input
                {...register('jobStatus')}
                type="radio"
                value={status.value}
                className="accent-primary"
              />
              <span className="text-sm">{t(`jobStatus.${status.value}`)}</span>
            </label>
          ))}
          {errors.jobStatus && (
            <p role="alert" className="text-xs text-red-500 mt-2">{errors.jobStatus.message}</p>
          )}
        </fieldset>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">
            {t('jobTitle.label')}<Required />
          </label>
          <p className="text-xs text-muted-foreground">{t('jobTitle.description')}</p>
          <select
            {...register('profession')}
            className={`${inputClass} max-w-xs ${errors.profession ? errorInputClass : ''}`}
            defaultValue="default"
          >
            <option value="default" disabled>{t('jobTitle.defaultOption')}</option>
            {PROFESSIONS.map((profession) => (
              <option key={profession.value} value={profession.value}>
                {profession.label}
              </option>
            ))}
          </select>
          {errors.profession && (
            <p role="alert" className="text-xs text-red-500">{errors.profession.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">
            {t('specialty.label')}
            <Optional label={t('optional')} />
          </label>
          <p className="text-xs text-muted-foreground">{t('specialty.description')}</p>
          <input
            {...register('specialty')}
            type="text"
            placeholder={t('specialty.placeholder')}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">
            {t('order.label')}
            <Optional label={t('optional')} />
          </label>
          <p className="text-xs text-muted-foreground">{t('order.description')}</p>
          <select
            {...register('professionalOrder')}
            className={inputClass}
          >
            {ORDERS.map((order) => (
              <option key={order.value} value={order.value}>
                {order.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">
            {t('graduationDate.label')}
            <Optional label={t('optional')} />
          </label>
          <p className="text-xs text-muted-foreground">{t('graduationDate.description')}</p>
          <input
            {...register('graduationDate')}
            type="date"
            className={`${inputClass} max-w-[15rem]`}
          />
        </div>
        <fieldset className="p-4 border rounded-lg">
          <legend className="px-2 text-sm font-medium">
            {t('sector.legend')}
            <Optional label={t('optional')} />
          </legend>
          {SECTORS.map((sector) => (
            <label
              key={sector.value}
              className="flex flex-row items-center gap-2 py-1 cursor-pointer hover:bg-muted rounded px-2 my-0.5 has-[:checked]:bg-muted"
            >
              <input
                {...register('sector')}
                type="radio"
                value={sector.value}
                className="accent-primary"
              />
              <span className="text-sm">{t(`sector.${sector.value}`)}</span>
            </label>
          ))}
        </fieldset>
        <fieldset className={`p-4 border rounded-lg ${errors.isAcceptingPatients ? 'border-red-500' : ''}`}>
          <legend className="px-2 text-sm font-medium">
            {t('newPatients.label')}<Required />
          </legend>
          {PATIENT_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex flex-row items-center gap-2 py-1 cursor-pointer hover:bg-muted rounded px-2 my-0.5 has-[:checked]:bg-muted"
            >
              <input
                {...register('isAcceptingPatients')}
                type="radio"
                value={option.value}
                className="accent-primary"
              />
              <span className="text-sm">{t(`newPatients.${option.value}`)}</span>
            </label>
          ))}
          {errors.isAcceptingPatients && (
            <p role="alert" className="text-xs text-red-500 mt-2">{errors.isAcceptingPatients.message}</p>
          )}
        </fieldset>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">
            {t('newPatientAcceptanceDate.label')}
            <Optional label={t('optional')} />
          </label>
          <p className="text-xs text-muted-foreground">{t('newPatientAcceptanceDate.description')}</p>
          <input
            {...register('newPatientAcceptanceDate')}
            type="date"
            className={`${inputClass} max-w-[15rem]`}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">
            {t('licenseNumber.label')}<Required />
          </label>
          <p className="text-xs text-muted-foreground">{t('licenseNumber.description')}</p>
          <input
            {...register('licenseNumber')}
            type="text"
            className={`${inputClass} max-w-[15rem] ${errors.licenseNumber ? errorInputClass : ''}`}
          />
          {errors.licenseNumber && (
            <p role="alert" className="text-xs text-red-500">{errors.licenseNumber.message}</p>
          )}
        </div>
      </section>

      {/* Consent */}
      <section className="flex flex-col gap-4">
        <div>
          <h4 className="p-0 m-0 text-xl font-medium">{t('consent')}</h4>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              {...register('consentToWebsite')}
              type="checkbox"
              className="mt-0.5 accent-primary"
            />
            <span className="text-sm font-medium">
              {t('consentToWebsite.label')}<Required />
            </span>
          </label>
          <p className="text-xs text-muted-foreground ml-5">{t('consentToWebsite.description')}</p>
          {errors.consentToWebsite && (
            <p role="alert" className="text-xs text-red-500">{errors.consentToWebsite.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              {...register('consentToReferrals')}
              type="checkbox"
              className="mt-0.5 accent-primary"
            />
            <span className="text-sm font-medium">
              {t('consentToReferrals.label')}
              <Optional label={t('optional')} />
            </span>
          </label>
          <p className="text-xs text-muted-foreground ml-5">{t('consentToReferrals.description')}</p>
        </div>
      </section>

      {Object.keys(errors).length > 0 && (
        <p className="text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg p-3">
          {t('formErrors.hasErrors')}
        </p>
      )}

      <div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <LoadingSpinner /> : t('submit')}
        </Button>
      </div>
    </form>
  )
}