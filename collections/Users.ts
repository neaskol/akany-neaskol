import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'email' },
  labels: { singular: 'Utilisateur', plural: 'Utilisateurs' },
  fields: [
    { name: 'name', type: 'text', label: 'Nom' },
  ],
}
