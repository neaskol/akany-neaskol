import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'pillar'],
  },
  labels: { singular: 'Événement', plural: 'Agenda' },
  fields: [
    { name: 'title', type: 'text', label: 'Titre', required: true },
    {
      name: 'date',
      type: 'date',
      label: 'Date',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' },
      },
    },
    {
      name: 'pillar',
      type: 'select',
      label: 'Pilier',
      required: true,
      options: [
        { label: 'Spirituel', value: 'spirituel' },
        { label: 'Social', value: 'social' },
        { label: 'Culturel', value: 'culturel' },
      ],
    },
    { name: 'place', type: 'text', label: 'Lieu' },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Photo' },
  ],
}
