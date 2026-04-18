import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'
import { Testimonials } from '@/collections/Testimonials'
import { Events } from '@/collections/Events'
import { Team } from '@/collections/Team'
import { Pages } from '@/collections/Pages'
import { ContactSubmissions } from '@/collections/ContactSubmissions'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const payloadSecret = process.env.PAYLOAD_SECRET

if (!payloadSecret) {
  throw new Error('PAYLOAD_SECRET is required to start Payload CMS.')
}

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Akany Neaskol',
      icons: [{ rel: 'icon', url: '/favicon.ico' }],
    },
    dateFormat: 'dd/MM/yyyy',
  },
  collections: [
    Users,
    Media,
    Testimonials,
    Events,
    Team,
    Pages,
    ContactSubmissions,
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      connectionTimeoutMillis: 10_000,
    },
    // Push schema au runtime uniquement — pas pendant next build (conflits concurrents)
    push: true,
  }),
  editor: lexicalEditor(),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  upload: {
    limits: {
      fileSize: 6_000_000, // 6 MB
    },
  },
})
