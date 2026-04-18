import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Initial migration: create all Payload tables on first production deploy.
// Uses adapter.requireDrizzleKit().pushSchema() which is available via @payloadcms/db-postgres.
export async function up({ payload }: MigrateUpArgs): Promise<void> {
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
}

export async function down({}: MigrateDownArgs): Promise<void> {}
