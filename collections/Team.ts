import type { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
  access: { read: () => true },
  admin: { useAsTitle: 'name' },
  labels: { singular: 'Membre du bureau', plural: 'Bureau' },
  fields: [
    { name: 'name', type: 'text', label: 'Nom', required: true },
    { name: 'role', type: 'text', label: 'Rôle dans le bureau' },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      label: 'Portrait',
    },
    {
      name: 'order',
      type: 'number',
      label: "Ordre d'affichage",
      defaultValue: 0,
    },
  ],
}
