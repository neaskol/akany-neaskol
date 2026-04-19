import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'pillar', '_status', 'updatedAt'],
  },
  labels: { singular: 'Témoignage', plural: 'Témoignages' },
  versions: { drafts: true },
  fields: [
    { name: 'name', type: 'text', label: 'Prénom', required: true },
    {
      name: 'slug',
      type: 'text',
      label: 'Identifiant URL',
      required: true,
      unique: true,
      admin: { description: "Ex : hasina · utilisé dans l'URL /temoignages/hasina" },
    },
    { name: 'age', type: 'number', label: 'Âge' },
    { name: 'role', type: 'text', label: 'Rôle / statut' },
    { name: 'place', type: 'text', label: 'Quartier / ville' },
    { name: 'since', type: 'text', label: 'Membre depuis' },
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
    {
      name: 'quote',
      type: 'textarea',
      label: 'Citation courte (affichée sur l\'accueil)',
      required: true,
    },
    {
      name: 'story',
      type: 'array',
      label: 'Témoignage complet (paragraphes)',
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'paragraph', type: 'textarea', label: 'Paragraphe' },
      ],
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      label: 'Portrait (JPG/PNG/WebP · 5 Mo max)',
    },
  ],
}
