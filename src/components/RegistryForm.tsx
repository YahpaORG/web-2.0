'use client'

import { RegistryFormValues } from '@/lib/validation/registry-form.schema'
import { Language, Profession } from '@/payload/payload-types'
import { ActionState } from '@/types/action-state'
import { useActionState } from 'react'
import { LoadingSpinner } from './ui/LoadingSpinner'

type RegistrySignupFormProps = {
  professions: Profession[]
  languages: Language[]
  action: (
    initialState: ActionState<RegistryFormValues>,
    formData: FormData,
  ) => Promise<ActionState<RegistryFormValues>>
  values: RegistryFormValues
}

export function CreateRegistryForm({
  professions,
  languages,
  action,
  values,
}: RegistrySignupFormProps) {
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
            name="first_name"
            type="text"
            placeholder="Jimmy"
            className="p-2 border rounded-lg"
            defaultValue={state.values.first_name}
            required
          />
          {state.errors.first_name && (
            <p role="alert" className="text-red-500">
              {state.errors.first_name.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Last Name</label>
          <input
            name="last_name"
            type="text"
            placeholder="Choo"
            className="p-2 border rounded-lg"
            defaultValue={state.values.last_name}
            required
          />
          {state.errors.last_name && (
            <p role="alert" className="text-red-500">
              {state.errors.last_name.message}
            </p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6">
        <div>
          <h4 className="p-0 m-0 text-xl font-medium">Contact Preferences</h4>
          <p className="text-sm">Please let us know your preferred methods of communication.</p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Phone Number</label>
          <input
            name="primary_phone_number"
            type="tel"
            placeholder="(514) 123-4567"
            className="p-2 border rounded-lg"
            defaultValue={state.values.primary_phone_number}
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

          <div className="flex flex-row items-center gap-2">
            <input
              name="preferred_contact_method"
              type="radio"
              defaultChecked
              value="email"
              required
            />
            <label>By Email</label>
          </div>
          <div className="flex flex-row items-center gap-2">
            <input name="preferred_contact_method" type="radio" value="phone" />
            <label>By Phone</label>
          </div>
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

        <fieldset className="p-4 border rounded-md">
          <legend className="px-2 text-sm font-semibold">
            Please select your current employment status
          </legend>

          <div className="flex flex-row items-center gap-2">
            <input name="status" type="radio" value="student" />
            <label>Student</label>
          </div>
          <div className="flex flex-row items-center gap-2">
            <input name="status" type="radio" value="employed" />
            <label>Employed</label>
          </div>
          <div className="flex flex-row items-center gap-2">
            <input name="status" type="radio" value="unemployed" />
            <label>Unemployed</label>
          </div>
          {state.errors.status && (
            <p role="alert" className="text-red-500">
              {state.errors.status.message}
            </p>
          )}
        </fieldset>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Job Title</label>
          <p className="text-sm text-gray-500">
            Please select the title that best reflects your current work or field of study.
          </p>
          <select
            name="profession"
            className="p-2 border rounded-lg max-w-[12rem]"
            defaultValue={state.values.profession}
            required
          >
            {professions.map((profession) => (
              <option key={profession.id} value={profession.id}>
                {profession.title}
              </option>
            ))}
          </select>
          {state.errors.primary_phone_number && (
            <p role="alert" className="text-red-500">
              {state.errors.primary_phone_number.message}
            </p>
          )}
        </div>
      </section>
      <button type="submit" className="px-4 py-2 text-white bg-black rounded-md">
        {isPending ? <LoadingSpinner /> : 'Submit'}
      </button>
    </form>
  )
}
