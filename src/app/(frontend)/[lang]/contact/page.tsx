import { ContactForm } from '@/components/ContactForm'
import { getTranslations } from '@/lib/get-translations'
import { createContactForm } from '@/lib/server/create-contact-form.action'
import { PageProps } from '@/types/page-props'

export default async function ContactPage(props: PageProps) {
  const { lang } = await props.params
  const t = await getTranslations(lang)
  return (
    <section className="flex flex-col items-center justify-center h-full py-12">
      <div className="flex flex-col items-center justify-center w-full gap-12 md:flex-row">
        <div className="flex flex-col max-w-md gap-4 mb-4 md:self-start">
          <h1 className="text-3xl">{t.contact.title}</h1>
          <h2 className="font-bold">{t.contact.subtitle}</h2>
          <p>{t.contact.description}</p>
          <p>{t.contact.footer}</p>
        </div>

        <ContactForm
          action={createContactForm}
          values={{
            name: '',
            email: '',
            reason: '',
            message: '',
          }}
        />
      </div>
    </section>
  )
}
