@AGENTS.md

# Règles projet

## Payload CMS — import obligatoire lazy

`lib/payload.ts` importe `@payload-config` via `import()` dynamique **à l'intérieur** de `getPayloadClient()`, pas au niveau module. Ne jamais remettre `import config from '@payload-config'` en top-level : cela déclenche une connexion postgres pendant le bundling Next.js et fait crasher `next build`.

## useSearchParams → toujours dans <Suspense>

Tout composant client qui appelle `useSearchParams()` doit être enveloppé dans `<Suspense>` dans son parent server component. Sans ça, `next build` crashe sur la page concernée (erreur SSG fatale).

## Build local vs production

Les erreurs `[payload:*] cannot connect to Postgres` dans les logs de `pnpm build` sont normales en local (DB non provisionnée). Elles sont non-fatales depuis la passe 4. En production Vercel, elles n'apparaissent pas si `DATABASE_URL` pointe sur Neon.

## Migrations Payload

`pnpm payload migrate` ne fonctionne pas en CLI standalone (tsx ESM ne résout pas les alias `@/`). Lancer les migrations via le dashboard admin Payload ou via un script Node qui charge le contexte Next.js. Ne pas mettre `payload migrate` dans le script `build` de `package.json`.
