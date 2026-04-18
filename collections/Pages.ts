import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: { read: () => true },
  admin: { useAsTitle: 'title' },
  labels: { singular: 'Page', plural: 'Pages' },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', label: 'Titre', required: true },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug URL',
      required: true,
      unique: true,
      admin: { description: 'Ex : accueil, association, spirituel' },
    },
    {
      name: 'hero',
      type: 'group',
      label: 'Section Hero (titre en plusieurs fragments)',
      admin: {
        description:
          'Le titre est fragmenté pour préserver le style mixte romain/italique. Laisser vide les parties non utilisées.',
      },
      fields: [
        { name: 'eyebrow', type: 'text', label: 'Sur-titre (ex : Antananarivo · Fondée 2010)' },
        {
          name: 'h1a',
          type: 'text',
          label: 'Fragment 1 — texte normal',
          admin: { placeholder: 'Vivre sa foi,' },
        },
        {
          name: 'h1b',
          type: 'text',
          label: 'Fragment 2 — couleur accent',
          admin: { placeholder: 'bâtir' },
        },
        {
          name: 'h1c',
          type: 'text',
          label: 'Fragment 3 — accent + italique',
          admin: { placeholder: 'ensemble' },
        },
        {
          name: 'h1d',
          type: 'text',
          label: 'Fragment 4 — texte normal',
          admin: { placeholder: 'la' },
        },
        {
          name: 'h1e',
          type: 'text',
          label: 'Fragment 5 — italique',
          admin: { placeholder: 'société.' },
        },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Image portrait hero' },
      ],
    },
    {
      name: 'missionText',
      type: 'textarea',
      label: 'Texte de mission (résumé)',
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'Bouton principal (CTA)',
      admin: { placeholder: 'Nous rejoindre' },
    },
    {
      name: 'marqueeWords',
      type: 'array',
      label: 'Mots du bandeau défilant',
      fields: [{ name: 'word', type: 'text', label: 'Mot' }],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'title', type: 'text', label: 'Titre SEO (affiché dans l\'onglet)' },
        { name: 'description', type: 'textarea', label: 'Description SEO (pour Google)' },
      ],
    },
  ],
}
