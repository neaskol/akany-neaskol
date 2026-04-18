// Seed data — utilisé comme fallback si la DB n'est pas encore connectée

export const SEED_TESTIMONIALS = [
  {
    id: 'hasina',
    slug: 'hasina',
    name: 'Hasina',
    age: 22,
    role: 'Membre depuis 2022',
    place: 'Antananarivo',
    pillar: 'spirituel',
    quote:
      "Neaskol m'a appris à vivre ma foi au quotidien — pas seulement le dimanche. C'est une famille qui m'aide à trouver ma place dans la société.",
    story: [
      "J'ai rejoint Akany Neaskol il y a trois ans, un peu par hasard — une amie m'avait invitée à une veillée de prière un jeudi soir. Je ne pensais pas y retourner.",
      "Ce qui m'a retenue, c'est la manière dont on m'a accueillie. Personne ne m'a demandé d'être parfaite, ni même très croyante. On m'a juste fait de la place.",
      "Aujourd'hui, ma foi s'est transformée. Ce n'est plus un devoir du dimanche — c'est une manière d'habiter chaque journée, avec les autres, pour les autres.",
      'Neaskol, c\'est ma deuxième famille. Et dans cette famille, j\'ai trouvé ma voix.',
    ],
    since: '2022',
    portrait: null,
  },
  {
    id: 'tiana',
    slug: 'tiana',
    name: 'Tiana',
    age: 19,
    role: 'Étudiante',
    place: 'Antananarivo',
    pillar: 'social',
    quote:
      "Ce qui me touche, c'est qu'on écoute vraiment les jeunes ici. On ne nous dit pas quoi penser — on nous aide à grandir, à décider, à servir.",
    story: [
      "Étudiante en deuxième année, je traversais une période difficile : doutes, pression des études, le sentiment de ne plus savoir où j'allais.",
      "Un membre de Neaskol m'a proposé d'intégrer un groupe d'écoute. J'y ai découvert un espace où l'on peut parler sans être jugée, et où la parole des jeunes compte vraiment.",
      "Ce qui m'a frappée, c'est que les adultes ne nous font pas la leçon. Ils nous posent des questions, nous laissent trouver nos réponses, et nous accompagnent dans nos choix.",
      "Je me suis engagée dans les distributions solidaires. Aider concrètement, c'est aussi ce qui m'aide à tenir debout.",
    ],
    since: '2023',
    portrait: null,
  },
  {
    id: 'rivo',
    slug: 'rivo',
    name: 'Rivo',
    age: 25,
    role: 'Animateur des veillées',
    place: 'Ankadivato',
    pillar: 'spirituel',
    quote:
      "Les actions de solidarité ont changé mon regard. On ne fait pas la charité — on construit des liens entre quartiers, entre générations.",
    story: [
      "J'ai grandi à Ankadivato. Enfant, je voyais déjà les activités de Neaskol dans le quartier — sans imaginer que j'en deviendrais un jour animateur.",
      "C'est en accompagnant mes premières distributions solidaires que j'ai compris : ce que nous faisons n'est pas de la charité descendante. C'est une rencontre.",
      "Les familles ne sont pas des bénéficiaires — ce sont des voisines, des amies, parfois des mentors. Elles nous apprennent autant qu'elles reçoivent.",
      "Aujourd'hui j'anime les veillées du jeudi. Voir de nouveaux jeunes franchir la porte chaque mois, c'est ma plus grande joie.",
    ],
    since: '2019',
    portrait: null,
  },
  {
    id: 'noro',
    slug: 'noro',
    name: 'Noro',
    age: 20,
    role: 'Bénévole',
    place: 'Ankadivato',
    pillar: 'culturel',
    quote:
      "Depuis 16 ans, Neaskol existait déjà dans nos vies. L'officialiser cette année, c'est confirmer ce qui a toujours été vrai : nous sommes une famille.",
    story: [
      "Ma mère participait aux premières veillées en 2010. J'ai littéralement grandi dans Neaskol — entre les chants, les repas partagés, les ateliers culturels du samedi.",
      "Pour moi, Neaskol n'a jamais été une association. C'était un lieu, une ambiance, un réseau d'amis — quelque chose de vivant, sans étiquette officielle.",
      "Quand on a décidé de nous officialiser en 2026, j'ai d'abord été sceptique : pourquoi changer ce qui fonctionnait ?",
      "Puis j'ai compris : officialiser, c'est ouvrir. C'est permettre à d'autres jeunes, ailleurs dans la ville, de trouver ce que j'ai eu la chance de trouver ici.",
    ],
    since: '2010 (famille)',
    portrait: null,
  },
]

export const SEED_EVENTS = [
  {
    id: '1',
    title: 'Veillée de prière intergénérationnelle',
    date: '2026-05-17T00:00:00.000Z',
    pillar: 'spirituel',
    place: 'Ankadivato · Antananarivo',
    image: null,
  },
  {
    id: '2',
    title: 'Distribution solidaire aux familles',
    date: '2026-06-02T00:00:00.000Z',
    pillar: 'social',
    place: 'Quartier Isotry · Antananarivo',
    image: null,
  },
  {
    id: '3',
    title: 'Concert & témoignages des jeunes',
    date: '2026-06-14T00:00:00.000Z',
    pillar: 'culturel',
    place: 'Salle paroissiale · Ankadivato',
    image: null,
  },
]

export type SeedTestimonial = (typeof SEED_TESTIMONIALS)[number]
export type SeedEvent = (typeof SEED_EVENTS)[number]
