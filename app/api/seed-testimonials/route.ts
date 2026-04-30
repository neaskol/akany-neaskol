import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getPayloadClient } from '@/lib/payload'

// Mapping complet : nom → slug, pilier, citation courte, lien YouTube
const TESTIMONIALS = [
  {
    name: 'Fr Zo',
    slug: 'zo',
    pillar: 'spirituel',
    quote: 'La foi n\'est pas une théorie — c\'est une rencontre qui change tout.',
    videoUrl: 'https://www.youtube.com/watch?v=pdL-gxkF1FU',
  },
  {
    name: 'Jaky',
    slug: 'jaky',
    pillar: 'spirituel',
    quote: 'Neaskol m\'a appris que grandir dans la foi, c\'est grandir avec les autres.',
    videoUrl: 'https://www.youtube.com/watch?v=BSMIxU0S5ok',
  },
  {
    name: 'Keren',
    slug: 'keren',
    pillar: 'culturel',
    quote: 'Ici, on ne nous demande pas d\'être parfaits — on nous invite à être vrais.',
    videoUrl: 'https://www.youtube.com/watch?v=WfjOet0yGV4',
  },
  {
    name: 'Elina',
    slug: 'elina',
    pillar: 'social',
    quote: 'Servir les autres, c\'est la manière dont j\'ai trouvé ma place à Neaskol.',
    videoUrl: 'https://www.youtube.com/watch?v=uIXxaUWf6Jw',
  },
  {
    name: 'Lalah',
    slug: 'lalah',
    pillar: 'culturel',
    quote: 'La culture nous rassemble, la foi nous unit — Neaskol, c\'est les deux à la fois.',
    videoUrl: 'https://www.youtube.com/watch?v=XYwFCu7kUyA',
  },
  {
    name: 'Joel',
    slug: 'joel',
    pillar: 'spirituel',
    quote: 'J\'ai trouvé dans cette communauté une famille qui m\'accompagne chaque jour.',
    videoUrl: 'https://www.youtube.com/watch?v=2T9VrtsV3Ss',
  },
  {
    name: 'Heriniaina',
    slug: 'heriniaina',
    pillar: 'social',
    quote: 'Ce qui m\'a touché, c\'est l\'écoute — ici, chaque voix compte vraiment.',
    videoUrl: 'https://www.youtube.com/watch?v=qvwhx33670E',
  },
  {
    name: 'Fiderana',
    slug: 'fiderana',
    pillar: 'spirituel',
    quote: 'Fidèle à sa foi, fidèle à sa communauté — c\'est ce que Neaskol m\'a appris.',
    videoUrl: 'https://www.youtube.com/watch?v=189j40uNYhg',
  },
  {
    name: 'Fetra',
    slug: 'fetra',
    pillar: 'social',
    quote: 'Ensemble, on accomplit bien plus que ce qu\'on imaginait seul.',
    videoUrl: 'https://www.youtube.com/watch?v=BgJnj0mY8y8',
  },
  {
    name: 'Annicette',
    slug: 'annicette',
    pillar: 'culturel',
    quote: 'Neaskol m\'a ouvert les yeux sur la richesse de notre quartier et de notre foi.',
    videoUrl: 'https://www.youtube.com/watch?v=-YBoNeJWJtU',
  },
  {
    name: 'Anja',
    slug: 'anja',
    pillar: 'culturel',
    quote: 'Grandir ici, c\'est découvrir qui on est — ensemble et pour les autres.',
    videoUrl: 'https://www.youtube.com/watch?v=hHIwgJeJILY',
  },
  {
    name: 'Ando',
    slug: 'ando',
    pillar: 'social',
    quote: 'Chaque geste de solidarité ici devient un lien — c\'est ça, Neaskol.',
    videoUrl: 'https://www.youtube.com/watch?v=6gVs6H6yf5Y',
  },
  {
    name: 'Maryna',
    slug: 'maryna',
    pillar: 'spirituel',
    quote: 'Neaskol m\'a montré que la foi se vit ensemble, dans la joie et l\'engagement.',
    videoUrl: 'https://www.youtube.com/watch?v=Odoxb8J5-nw',
  },
  {
    name: 'Miharitiana',
    slug: 'miharitiana',
    pillar: 'culturel',
    quote: 'Ici, j\'ai trouvé un espace pour grandir — comme personne et comme chrétien.',
    videoUrl: 'https://www.youtube.com/watch?v=TsqrrGPwaxw',
  },
  {
    name: 'Mirana',
    slug: 'mirana',
    pillar: 'social',
    quote: 'Servir, c\'est ce qui m\'a appris à me connaître moi-même.',
    videoUrl: 'https://www.youtube.com/watch?v=whZVfnFCGmQ',
  },
  {
    name: 'Nantenaina',
    slug: 'nantenaina',
    pillar: 'spirituel',
    quote: 'La prière et l\'action vont ensemble — Neaskol me le rappelle chaque semaine.',
    videoUrl: 'https://www.youtube.com/watch?v=gEy-dkJPx08',
  },
  {
    name: 'Stephanie',
    slug: 'stephanie',
    pillar: 'social',
    quote: 'J\'ai appris à donner sans compter, et c\'est Neaskol qui m\'a ouvert ce chemin.',
    videoUrl: 'https://www.youtube.com/watch?v=UkpvmdEfgAI',
  },
  {
    name: 'Sam',
    slug: 'sam',
    pillar: 'culturel',
    quote: 'Dans cette communauté, chaque jeune a sa place — la mienne, je l\'ai trouvée ici.',
    videoUrl: 'https://www.youtube.com/watch?v=sNZz31uEKZ0',
  },
] as const

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get('secret')
    if (!secret || secret !== process.env.PAYLOAD_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await getPayloadClient(30_000)
    const results: { slug: string; action: string }[] = []

    for (const t of TESTIMONIALS) {
      const existing = await payload.find({
        collection: 'testimonials',
        where: { slug: { equals: t.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        const doc = existing.docs[0]
        await payload.update({
          collection: 'testimonials',
          id: doc.id,
          data: { videoUrl: t.videoUrl, _status: 'published' },
        })
        results.push({ slug: t.slug, action: 'published' })
      } else {
        await payload.create({
          collection: 'testimonials',
          data: {
            name: t.name,
            slug: t.slug,
            pillar: t.pillar,
            quote: t.quote,
            videoUrl: t.videoUrl,
            _status: 'published',
          },
        })
        results.push({ slug: t.slug, action: 'created + published' })
      }
    }

    revalidatePath('/')
    revalidatePath('/temoignages')
    return NextResponse.json({ ok: true, results, revalidated: ['/', '/temoignages'] })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[seed-testimonials]', err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
