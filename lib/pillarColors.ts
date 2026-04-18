// Maps a pillar value to its design-system accent color.
// Colors live in code (not the DB) to guarantee visual consistency.
export const PILLAR_COLORS: Record<string, string> = {
  spirituel: 'var(--lemon-500)',
  social: 'var(--flame-500)',
  culturel: 'var(--cream-500)',
}

export const PILLAR_LABELS: Record<string, string> = {
  spirituel: 'Spirituel',
  social: 'Social',
  culturel: 'Culturel',
}
