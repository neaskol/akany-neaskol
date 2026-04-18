/**
 * Seed initial content in Payload CMS.
 * Run once after database setup: pnpm seed
 *
 * Usage:
 *   DATABASE_URL=... PAYLOAD_SECRET=... pnpm seed
 */

import payload from 'payload'
import config from '../payload.config'
import { SEED_TESTIMONIALS, SEED_EVENTS } from '../lib/seed'

async function seed() {
  await payload.init({ config })

  console.log('🌱 Seeding database...')

  // Create admin user
  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers.totalDocs === 0) {
    const adminPassword = process.env.SEED_ADMIN_PASSWORD
    if (!adminPassword) {
      console.error('❌ SEED_ADMIN_PASSWORD env var is required to create the admin user.')
      console.error('   Example: SEED_ADMIN_PASSWORD=<strong-password> pnpm seed')
      process.exit(1)
    }
    await payload.create({
      collection: 'users',
      data: {
        email: process.env.SEED_ADMIN_EMAIL ?? 'admin@akany-neaskol.org',
        password: adminPassword,
        name: 'Administrateur',
      },
    })
    console.log(`✓ Admin user created (${process.env.SEED_ADMIN_EMAIL ?? 'admin@akany-neaskol.org'})`)
  } else {
    console.log('→ Admin user already exists, skipping.')
  }

  // Seed testimonials
  const existingTestimonials = await payload.find({ collection: 'testimonials', limit: 1 })
  if (existingTestimonials.totalDocs === 0) {
    for (const t of SEED_TESTIMONIALS) {
      await payload.create({
        collection: 'testimonials',
        data: {
          name: t.name,
          slug: t.slug,
          age: t.age,
          role: t.role,
          place: t.place,
          pillar: t.pillar,
          since: t.since,
          quote: t.quote,
          story: t.story.map((p) => ({ paragraph: p })),
          _status: 'published',
        },
      })
      console.log(`✓ Testimonial: ${t.name}`)
    }
  } else {
    console.log(`→ ${existingTestimonials.totalDocs} testimonials already exist, skipping.`)
  }

  // Seed events
  const existingEvents = await payload.find({ collection: 'events', limit: 1 })
  if (existingEvents.totalDocs === 0) {
    for (const e of SEED_EVENTS) {
      await payload.create({
        collection: 'events',
        data: {
          title: e.title,
          date: e.date,
          pillar: e.pillar,
          place: e.place,
        },
      })
      console.log(`✓ Event: ${e.title}`)
    }
  } else {
    console.log(`→ ${existingEvents.totalDocs} events already exist, skipping.`)
  }

  console.log('\n✅ Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
