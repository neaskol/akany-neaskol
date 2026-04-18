import { pushDevSchema } from '@payloadcms/drizzle'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Initial migration: create all Payload tables on first production deploy.
// pushDevSchema requires NODE_ENV !== 'production', so we override it temporarily.
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const adapter = payload.db as any
  const originalEnv = process.env.NODE_ENV
  ;(process.env as any).NODE_ENV = 'development'
  ;(process.env as any).PAYLOAD_FORCE_DRIZZLE_PUSH = 'true'
  try {
    await pushDevSchema(adapter)
  } finally {
    ;(process.env as any).NODE_ENV = originalEnv
    delete (process.env as any).PAYLOAD_FORCE_DRIZZLE_PUSH
  }
}

export async function down({}: MigrateDownArgs): Promise<void> {}
