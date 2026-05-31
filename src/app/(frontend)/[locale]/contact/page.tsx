import { ContactForm } from '@/components/ContactForm'
import { createContactForm } from '@/lib/server/create-contact-form.action'
import { getTranslations } from 'next-intl/server'

export default async function ContactPage() {
  const t = await getTranslations()

  return (
    <div className="flex justify-center flex-1 w-full px-4 py-16">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-12">

        {/* Left side */}
        <div className="flex-1 flex-col gap-4 md:sticky md:top-24 md:self-start">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold tracking-tight">{t('contact.title')}</h1>
            <p className="text-muted-foreground font-medium">{t('contact.subtitle')}</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{t('contact.description')}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{t('contact.footer')}</p>
        </div>

        {/* Right side */}
        <div className="flex-1">
          <ContactForm
            action={createContactForm}
            values={{ name: '', email: '', reason: '', message: '' }}
          />
        </div>

      </div>
    </div>
  )
}