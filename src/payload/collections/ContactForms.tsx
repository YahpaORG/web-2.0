import type { CollectionConfig } from 'payload'
import { admins } from '@/payload/access/admins'
import { anyone } from '@/payload/access/anyone'
import { render } from '@react-email/render'
import MyTemplate from '../emails/MyTemplate'

export const ContactForms: CollectionConfig = {
  labels: {
    singular: 'Contact Form',
    plural: 'Contact Forms',
  },
  slug: 'contact-forms',
  access: {
    read: admins,
    create: anyone,
    delete: admins,
    update: () => false,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          console.log('sendEmail', doc)
          const html = await render(<MyTemplate />)
          req.payload.sendEmail({
            from: 'website@yahpa.org',
            html,
            subject: 'Hello from YAHPA (testing)',
            to: doc.email,
          })
        }
      },
    ],
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
