import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: ({ req }) => !!req.user,
  },
  labels: { singular: 'Média', plural: 'Médiathèque' },
  upload: {
    staticDir: 'media',
    imageSizes: [
      { name: 'thumbnail', width: 400, position: 'centre' },
      { name: 'card', width: 800, position: 'centre' },
      { name: 'hero', width: 1600, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    { name: 'alt', type: 'text', label: 'Texte alternatif (accessibilité)' },
  ],
}
