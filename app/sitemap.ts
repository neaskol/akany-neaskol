import type { MetadataRoute } from 'next'
import { getPayloadClient, withTimeout } from '@/lib/payload'
import { SEED_TESTIMONIALS } from '@/lib/seed'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://akany-neaskol.org').replace(/\/$/, '')

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/association`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/spirituel`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/social-culturel`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/temoignages`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: 'yearly', priority: 0.5 },
  ]

  let testimonialUrls: MetadataRoute.Sitemap = []
  try {
    const payload = await getPayloadClient()
    const result = await withTimeout(
      payload.find({
        collection: 'testimonials',
        where: { _status: { equals: 'published' } },
        limit: 200,
      }),
      5000,
      'payload:find-sitemap-testimonials',
    )
    testimonialUrls = result.docs.map((d) => ({
      url: `${base}/temoignages/${d.slug as string}`,
      lastModified: new Date(d.updatedAt as string),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    testimonialUrls = SEED_TESTIMONIALS.map((t) => ({
      url: `${base}/temoignages/${t.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  }

  return [...staticRoutes, ...testimonialUrls]
}
