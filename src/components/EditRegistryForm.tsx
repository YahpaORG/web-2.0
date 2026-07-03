'use client'
import {
    ORDERS,
    PATIENT_OPTIONS,
    PROFESSIONS,
    SECTORS,
} from '@/lib/validation/registry-form.schema'
import { EditRegistryFormSchema, EditRegistryFormValues } from '@/lib/validation/edit-registry-form.schema'
import { Language } from '@/payload/payload-types'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useState } from 'react'
import { LoadingSpinner } from './ui/LoadingSpinner'
import { Button } from './ui/button'

type EditRegistryFormProps = {
    id: string
    values: EditRegistryFormValues
    languages: Language[]
    action: (id: string, data: EditRegistryFormValues) => Promise<{ errors?: Record<string, { message: string }> }>
}

function Required() {
    return <span className="text-red-500 ml-0.5">*</span>
}

function Optional({ label }: { label: string }) {
    return <span className="ml-1 text-xs font-normal text-muted-foreground">({label})</span>
}

const inputClass = 'p-2.5 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full'
const errorInputClass = 'border-red-500'

export function EditRegistryForm({ id, values, languages, action }: EditRegistryFormProps) {
    const t = useTranslations('RegistryForm')
    const [apiError, setApiError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<EditRegistryFormValues>({
        resolver: standardSchemaResolver(EditRegistryFormSchema),
        defaultValues: values,
    })

    const onSubmit = async (data: EditRegistryFormValues) => {
        setApiError(null)
        setSuccess(false)
        const result = await action(id, data)
        if (result?.errors?.api) {
            setApiError(result.errors.api.message)
        } else if (!result.errors) {
            setSuccess(true)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
            {apiError && (
                <p role="alert" className="text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg p-3">
                    {apiError}
                </p>
            )}
            {success && (
                <p role="alert" className="text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg p-3">
                    {t('updateSuccess')}
                </p>
            )}

            {/* Personal Info */}
            <section className="flex flex-col gap-4">
                <h4 className="text-xl font-medium">{t('personalInfo')}</h4>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">{t('firstName')}<Required /></label>
                    <input
                        {...register('firstName')}
                        type="text"
                        className={`${inputClass} ${errors.firstName ? errorInputClass : ''}`}
                    />
                    {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">{t('lastName')}<Required /></label>
                    <input
                        {...register('lastName')}
                        type="text"
                        className={`${inputClass} ${errors.lastName ? errorInputClass : ''}`}
                    />
                    {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
                </div>
                <fieldset className={`border rounded-lg ${errors.languages ? 'border-red-500' : ''}`}>
                    <legend className="px-2 ml-4 text-sm font-medium">{t('fluentLanguages')}<Required /></legend>
                    <ul className="flex flex-row flex-wrap m-4">
                        {languages.map((option) => (
                            <li key={option.id} className="w-full max-w-[10rem]">
                                <label className="flex items-center whitespace-nowrap cursor-pointer px-2 py-1 m-0.5 transition-colors hover:bg-muted rounded has-[:checked]:bg-muted">
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
                    {errors.languages && <p className="text-xs text-red-500 m-4 mt-0">{errors.languages.message}</p>}
                </fieldset>
            </section>

            {/* Contact Info */}
            <section className="flex flex-col gap-4">
                <h4 className="text-xl font-medium">{t('contactPreferences')}</h4>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">
                        {t('email')}
                        <Optional label={t('optional')} />
                    </label>
                    <input
                        {...register('email')}
                        type="email"
                        className={`${inputClass} ${errors.email ? errorInputClass : ''}`}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
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
                    {errors.primaryPhoneNumber && <p className="text-xs text-red-500">{errors.primaryPhoneNumber.message}</p>}
                </div>
            </section>

            {/* Practice Info */}
            <section className="flex flex-col gap-4">
                <h4 className="text-xl font-medium">
                    {t('practiceInfoSection')}
                    <Optional label={t('optional')} />
                </h4>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">{t('practiceInfo.name')}</label>
                    <input {...register('practiceInfo.name')} type="text" className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">{t('practiceInfo.address')}</label>
                    <input {...register('practiceInfo.address')} type="text" className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">{t('practiceInfo.email')}</label>
                    <input
                        {...register('practiceInfo.email')}
                        type="email"
                        className={`${inputClass} ${errors.practiceInfo?.email ? errorInputClass : ''}`}
                    />
                    {errors.practiceInfo?.email && <p className="text-xs text-red-500">{errors.practiceInfo.email.message}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">{t('practiceInfo.phone')}</label>
                    <input
                        {...register('practiceInfo.phone')}
                        type="tel"
                        placeholder="(514) 123-4567"
                        className={`${inputClass} ${errors.practiceInfo?.phone ? errorInputClass : ''}`}
                    />
                    {errors.practiceInfo?.phone && <p className="text-xs text-red-500">{errors.practiceInfo.phone.message}</p>}
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
                    {errors.practiceInfo?.website && <p className="text-xs text-red-500">{errors.practiceInfo.website.message}</p>}
                </div>
            </section>

            {/* Professional Info */}
            <section className="flex flex-col gap-4">
                <h4 className="text-xl font-medium">{t('professionalInfo')}</h4>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">{t('jobTitle.label')}<Required /></label>
                    <select
                        {...register('profession')}
                        className={`${inputClass} max-w-xs ${errors.profession ? errorInputClass : ''}`}
                    >
                        {PROFESSIONS.map((profession) => (
                            <option key={profession.value} value={profession.value}>
                                {profession.label}
                            </option>
                        ))}
                    </select>
                    {errors.profession && <p className="text-xs text-red-500">{errors.profession.message}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">
                        {t('specialty.label')}
                        <Optional label={t('optional')} />
                    </label>
                    <input {...register('specialty')} type="text" placeholder={t('specialty.placeholder')} className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">
                        {t('order.label')}
                        <Optional label={t('optional')} />
                    </label>
                    <select {...register('professionalOrder')} className={inputClass}>
                        {ORDERS.map((order) => (
                            <option key={order.value} value={order.value}>{order.label}</option>
                        ))}
                    </select>
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
                            <input {...register('sector')} type="radio" value={sector.value} className="accent-primary" />
                            <span className="text-sm">{t(`sector.${sector.value}`)}</span>
                        </label>
                    ))}
                </fieldset>
                <fieldset className={`p-4 border rounded-lg ${errors.isAcceptingPatients ? 'border-red-500' : ''}`}>
                    <legend className="px-2 text-sm font-medium">{t('newPatients.label')}<Required /></legend>
                    {PATIENT_OPTIONS.map((option) => (
                        <label
                            key={option.value}
                            className="flex flex-row items-center gap-2 py-1 cursor-pointer hover:bg-muted rounded px-2 my-0.5 has-[:checked]:bg-muted"
                        >
                            <input {...register('isAcceptingPatients')} type="radio" value={option.value} className="accent-primary" />
                            <span className="text-sm">{t(`newPatients.${option.value}`)}</span>
                        </label>
                    ))}
                    {errors.isAcceptingPatients && <p className="text-xs text-red-500 mt-2">{errors.isAcceptingPatients.message}</p>}
                </fieldset>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">
                        {t('newPatientAcceptanceDate.label')}
                        <Optional label={t('optional')} />
                    </label>
                    <input {...register('newPatientAcceptanceDate')} type="date" className={`${inputClass} max-w-[15rem]`} />
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