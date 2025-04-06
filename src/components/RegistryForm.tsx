'use client'

import {
  CONTACT_METHODS,
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

type RegistrySignupFormProps = {
  languages: Language[]
  action: (
    initialState: ActionState<RegistryFormValues>,
    formData: FormData,
  ) => Promise<ActionState<RegistryFormValues>>
  values: RegistryFormValues
}

export function CreateRegistryForm({ languages, action, values }: RegistrySignupFormProps) {
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
      <section className="flex flex-col gap-6">
        <div>
          <h4 className="p-0 m-0 text-xl font-medium">Personal Information</h4>
          <p className="text-sm">Tell us a little about yourself.</p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">First Name</label>
          <input
            name="firstName"
            type="text"
            placeholder="Jimmy"
            className="p-2 border rounded-lg"
            defaultValue={state.values.firstName}
            required
          />
          {state.errors.firstName && (
            <p role="alert" className="text-red-500">
              {state.errors.firstName.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Last Name</label>
          <input
            name="lastName"
            type="text"
            placeholder="Choo"
            className="p-2 border rounded-lg"
            defaultValue={state.values.lastName}
            required
          />
          {state.errors.lastName && (
            <p role="alert" className="text-red-500">
              {state.errors.lastName.message}
            </p>
          )}
        </div>
        <fieldset className="border rounded-md">
          <legend className="px-2 ml-4 text-sm font-semibold">
            Please indicate which languages you are fluent in
          </legend>
          <ul className="flex flex-row flex-wrap m-4">
            {languages.map((option) => (
              <li key={option.id} className="w-full max-w-[10rem]">
                <label className="flex items-center whitespace-nowrap cursor-pointer max-w-[200px] px-2 py-1 transition-colors hover:bg-gray-100 [&:has(input:checked)]:bg-gray-200">
                  <input
                    type="checkbox"
                    name="languages"
                    value={option.id}
                    className="cursor-pointer"
                    defaultChecked={state.values.languages.includes(option.id)}
                  />
                  <span className="ml-2">{option.autonym}</span>
                </label>
              </li>
            ))}
          </ul>
          {state.errors.languages && (
            <p role="alert" className="text-red-500">
              {state.errors.languages.message}
            </p>
          )}
        </fieldset>
      </section>
      <section className="flex flex-col gap-6">
        <div>
          <h4 className="p-0 m-0 text-xl font-medium">Contact Preferences</h4>
          <p className="text-sm">Please let us know your preferred methods of communication.</p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Email</label>
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
            <p role="alert" className="text-red-500">
              {state.errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Phone Number</label>
          <input
            name="primaryPhoneNumber"
            type="tel"
            placeholder="(514) 123-4567"
            className="p-2 border rounded-lg"
            defaultValue={state.values.primaryPhoneNumber}
            required
          />
          {state.errors.primary_phone_number && (
            <p role="alert" className="text-red-500">
              {state.errors.primary_phone_number.message}
            </p>
          )}
        </div>

        <fieldset className="p-4 border rounded-md">
          <legend className="px-2 text-sm font-semibold ">
            Please select your preferred contact method
          </legend>

          {CONTACT_METHODS.map((method) => (
            <div key={method.label} className="flex flex-row items-center gap-2">
              <input
                name="preferredContactMethod"
                type="radio"
                defaultChecked={state.values.preferredContactMethod === method.value}
                value={method.value}
                required
              />
              <label>{method.label}</label>
            </div>
          ))}

          {state.errors.preferred_contact_method && (
            <p role="alert" className="text-red-500">
              {state.errors.preferred_contact_method.message}
            </p>
          )}
        </fieldset>
      </section>
      <section className="flex flex-col gap-6">
        <div>
          <h4 className="p-0 m-0 text-xl font-medium">Professional Information</h4>
          <p className="text-sm">Tell us more about your current professional status</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Job Title</label>
          <p className="text-sm text-gray-500">
            Please select the title that best reflects your current work or field of study.
          </p>
          <select
            name="profession"
            className="p-2 border rounded-lg max-w-[15rem]"
            defaultValue={state.values.profession ?? 'default'}
            required
          >
            <option value="default" disabled>
              Please select a profession
            </option>
            {PROFESSIONS.map((profession) => (
              <option key={profession.value} value={profession.value}>
                {profession.label}
              </option>
            ))}
          </select>
          {state.errors.profession && (
            <p role="alert" className="text-red-500">
              {state.errors.profession.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Specialty</label>
          <p className="text-sm text-gray-500">Specify your specialty if applicable.</p>
          <input
            name="specialty"
            type="text"
            placeholder="E.g. Family medicine, Child psychology."
            className="p-2 border rounded-lg"
            defaultValue={state.values.specialty}
          />
          {state.errors.specialty && (
            <p role="alert" className="text-red-500">
              {state.errors.specialty.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Professional Order or Association</label>
          <p className="text-sm text-gray-500">
            Please select the professional body or association that best applies to your profession.
          </p>
          <select
            key={state.values.professionalOrder}
            name="professionalOrder"
            className="p-2 border rounded-lg"
            defaultValue={state.values.professionalOrder ?? 'default'}
            required
          >
            <option value="default" disabled>
              Please select an order
            </option>
            {ORDERS.map((order) => (
              <option key={order.value} value={order.value}>
                {order.label}
              </option>
            ))}
          </select>
          {state.errors.professionalOrder && (
            <p role="alert" className="text-red-500">
              {state.errors.professionalOrder.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Graduation Date</label>
          <p className="text-sm text-gray-500">
            If you are currently studying, this could also be your estimated graduation date.
          </p>
          <input
            name="graduationDate"
            type="date"
            placeholder="Jimmy"
            className="p-2 border rounded-lg max-w-[15rem]"
            defaultValue={state.values.graduationDate}
            required
          />
          {state.errors.graduationDate && (
            <p role="alert" className="text-red-500">
              {state.errors.graduationDate.message}
            </p>
          )}
        </div>
        <fieldset className="p-4 border rounded-md">
          <legend className="px-2 text-sm font-semibold ">Please select your Sector of work</legend>

          {SECTORS.map((sector) => (
            <div key={sector.label} className="flex flex-row items-center gap-2">
              <input
                name="sector"
                type="radio"
                defaultChecked={state.values.sector === sector.value}
                value={sector.value}
              />
              <label>{sector.label}</label>
            </div>
          ))}

          {state.errors.sector && (
            <p role="alert" className="text-red-500">
              {state.errors.sector.message}
            </p>
          )}
        </fieldset>
        <fieldset className="p-4 border rounded-md">
          <legend className="px-2 text-sm font-semibold ">Are you accepting new patients?</legend>

          {PATIENT_OPTIONS.map((option) => (
            <div key={option.label} className="flex flex-row items-center gap-2">
              <input
                name="isAcceptingPatients"
                type="radio"
                defaultChecked={state.values.isAcceptingPatients === option.value}
                value={option.value}
              />
              <label>{option.label}</label>
            </div>
          ))}

          {state.errors.isAcceptingPatients && (
            <p role="alert" className="text-red-500">
              {state.errors.isAcceptingPatients.message}
            </p>
          )}
        </fieldset>
      </section>
      {Object.keys(state.errors).length > 0 && (
        <p className="text-red-500">Please correct the errors before submitting.</p>
      )}
      <div>
        <button type="submit" className="px-4 py-2 text-white bg-black rounded-md">
          {isPending ? <LoadingSpinner /> : 'Submit'}
        </button>
      </div>
    </form>
  )
}
