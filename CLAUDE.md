@AGENTS.md

# Design Context

PRODUCT.md à la racine du projet contient le brief de marque complet (registre, utilisateurs, personnalité, anti-références, principes). Lire avant tout travail UI.

- **Registre :** brand (80 % marketing, 20 % admin CMS)
- **Personnalité :** warm, rooted, faithful — pas mega-church slick
- **WCAG :** AA (focus rings lemon sur fond clair, paper sur fond sombre)
- **Tokens :** utiliser les variables CSS de `app/globals.css` — jamais de `rgba()` brut dans les composants. Alpha variants disponibles : `--lemon-500-tint`, `--flame-500-tint`, `--paper-alpha-10`, `--glass-light-08/12/14/20`, `--glass-dark-04/06/12/14`
- **Interdits absolus :** `border-left/right > 1px` comme accent coloré, gradient text (`background-clip: text`), glassmorphism décoratif, em dashes (`—`) dans le JSX ou le copy, carte imbriquée dans une carte

# Règles projet

## Payload CMS — import obligatoire lazy

`lib/payload.ts` importe `@payload-config` via `import()` dynamique **à l'intérieur** de `getPayloadClient()`, pas au niveau module. Ne jamais remettre `import config from '@payload-config'` en top-level : cela déclenche une connexion postgres pendant le bundling Next.js et fait crasher `next build`.

## useSearchParams → toujours dans <Suspense>

Tout composant client qui appelle `useSearchParams()` doit être enveloppé dans `<Suspense>` dans son parent server component. Sans ça, `next build` crashe sur la page concernée (erreur SSG fatale).

## Build local vs production

Les erreurs `[payload:*] cannot connect to Postgres` dans les logs de `pnpm build` sont normales en local (DB non provisionnée). Elles sont non-fatales depuis la passe 4. En production Vercel, elles n'apparaissent pas si `DATABASE_URL` pointe sur Neon.

## Migrations Payload

`pnpm payload migrate` ne fonctionne pas en CLI standalone (tsx ESM ne résout pas les alias `@/`). Lancer les migrations via le dashboard admin Payload ou via un script Node qui charge le contexte Next.js. Ne pas mettre `payload migrate` dans le script `build` de `package.json`.
