import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'

import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
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
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Akany Neaskol',
      icons: [{ rel: 'icon', url: '/favicon.ico' }],
    },
    dateFormat: 'dd/MM/yyyy',
    components: {
      Nav: '@/components/admin/Nav#default',
      views: {
        dashboard: {
          Component: '@/components/admin/views/Dashboard#default',
        },
        login: {
          Component: '@/components/admin/views/Login#default',
        },
      },
    },
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
    push: false,
    prodMigrations: [
      {
        name: '20240101_init',
        async up({ payload }: MigrateUpArgs): Promise<void> {
          const adapter = payload.db as any
          const { pushSchema } = adapter.requireDrizzleKit()
          const { apply } = await pushSchema(
            adapter.schema,
            adapter.drizzle,
            adapter.schemaName ? [adapter.schemaName] : undefined,
            adapter.tablesFilter,
            adapter.extensions?.postgis ? ['postgis'] : undefined,
          )
          await apply()
        },
        async down({}: MigrateDownArgs): Promise<void> {},
      },
      {
        name: '20260429_testimonials_video_url',
        async up({ payload }: MigrateUpArgs): Promise<void> {
          const db = (payload.db as any).drizzle
          await db.execute(
            `ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS video_url varchar;`,
          )
        },
        async down({}: MigrateDownArgs): Promise<void> {},
      },
    ],
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
