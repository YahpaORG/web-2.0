import { ContactForm } from '@/components/ContactForm'
import { createContactForm } from '@/lib/server/create-contact-form.action'

export default function ContactPage() {
  return (
    <section className="flex flex-col items-center justify-center h-full py-12">
      <div className="flex flex-col items-center justify-center w-full gap-12 md:flex-row">
        <div className="flex flex-col max-w-md gap-4 mb-4 md:self-start">
          <h1 className="text-3xl">Contact Us</h1>
          <h2 className="font-bold">We&apos;re here to help</h2>
          <p>
            Thank you for reaching out to us. Whether you&apos;re a healthcare professional looking
            for resources, or a patient seeking more information about healthcare providers,
            we&apos;re here to support you. Please feel free to share your questions, feedback, or
            inquiries, and our team will get back to you as soon as possible.
          </p>
          <p>
            Your well-being and access to quality healthcare are our top priority. We look forward
            to connecting with you!
          </p>
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
