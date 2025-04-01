import type { CollectionConfig, CollectionAfterChangeHook } from 'payload'
import { adminsOnly } from '@/payload/access/adminsOnly'
import { anyone } from '@/payload/access/anyone'
import { render } from '@react-email/render'
import ContactFormReceivedEmail from '../emails/ContactFormReceivedEmail'
import { ContactForm } from '../payload-types'

const sendEmailAfterChange: CollectionAfterChangeHook<ContactForm> = async ({
  doc,
  operation,
  req,
}) => {
  if (operation === 'create') {
    const html = await render(
      <ContactFormReceivedEmail
        name={doc.name}
        date={new Date(doc.createdAt)}
        reason={doc.reason}
        message={doc.message}
      />,
    )
    req.payload.sendEmail({
      from: 'website@yahpa.org',
      html,
      subject: `YAHPA - We received your request for ${doc.reason}`,
      to: doc.email,
    })
  }
}

export const contactForms: CollectionConfig = {
  labels: {
    singular: 'Contact Form',
    plural: 'Contact Forms',
  },
  slug: 'contact-forms',
  access: {
    read: adminsOnly,
    create: anyone,
    delete: adminsOnly,
    update: () => false,
  },
  hooks: {
    afterChange: [sendEmailAfterChange],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'reason',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
}
