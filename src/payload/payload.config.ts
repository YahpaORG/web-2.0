// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { resendAdapter } from '@payloadcms/email-resend'
import {
  defaultEditorFeatures,
  FixedToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { contactForms } from './collections/contactForms.collection'
import { media } from './collections/media.collection'
import { users } from './collections/users.collection'
import { admins } from './collections/admins.collection'
import { registryMembers } from './collections/registryMembers.collection'
import { registryForms } from './collections/registryForms.collection'
import { languages } from './collections/languages.collection'
import { projects } from './collections/projects.collection'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing';

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    user: admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      title: 'YAHPA',
    },

    components: {
      beforeDashboard: ['@/payload/components/Dashboard'],
      graphics: {
        Logo: {
          path: '@/payload/graphics/Logo',
          exportName: 'Logo',
        },
        Icon: {
          path: '@/payload/graphics/Icon',
          exportName: 'Icon',
        },
      },
    },
  },
  email: resendAdapter({
    defaultFromAddress: 'website@yahpa.org',
    defaultFromName: 'YAHPA - Web (testing)',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  localization: {
    locales: ['en', 'fr'], // required
    defaultLocale: 'en', // required
  },
  collections: [
    users,
    media,
    contactForms,
    admins,
    registryForms,
    registryMembers,
    languages,
    projects,
  ],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, './payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // Vercel Blob Storage if we need it 1GB free
    // vercelBlobStorage({
    //   enabled: true,
    //   clientUploads: true,
    //   collections: {
    //     media: {
    //       prefix: 'media',
    //     },
    //   },
    //   token: process.env.dev_READ_WRITE_TOKEN,
    // }),
    uploadthingStorage({
      collections: {
        media: {
          disablePayloadAccessControl: true,
          // generateFileURL: ({ filename }) => {
          //   return `https://zorg3s99oz.ufs.sh/f/${filename}`
          // }
        },
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN || '',
        acl: 'public-read',
      },
    }),
  ],
})
