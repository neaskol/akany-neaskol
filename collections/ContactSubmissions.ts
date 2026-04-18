import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  access: {
    create: () => true,
    read: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'subject', 'read', 'createdAt'],
  },
  labels: { singular: 'Message', plural: 'Messages' },
  fields: [
    { name: 'name', type: 'text', label: 'Nom', required: true },
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'subject', type: 'text', label: 'Sujet' },
    { name: 'message', type: 'textarea', label: 'Message', required: true },
    {
      name: 'read',
      type: 'checkbox',
      label: 'Lu',
      defaultValue: false,
    },
  ],
  timestamps: true,
}
