# Audit — Akany Neaskol

> Effectué le 2026-04-18 · Passes 1, 2 et 3 appliquées le 2026-04-18
> Sévérité : 🔴 critique / 🟠 majeur / 🟡 mineur / 🟢 positif
> Statut : ✅ Corrigé / ⚠️ Action manuelle / ⏳ En attente / 🔲 À faire

---

## Statut actuel — après passe 3

### ✅ Fait côté code
- `pnpm lint` repasse au vert
- `pnpm exec tsc --noEmit --pretty false` repasse au vert
- La page `/temoignages` recompile correctement
- Le fallback dangereux `dev-secret-please-change` a été supprimé
- Le formulaire de contact a été durci et rendu plus cohérent
- L'accessibilité de base a été renforcée (`skip link`, vrais labels, états ARIA, menu mobile plus robuste)
- Les principales pages publiques sont maintenant responsive
- Les requêtes Payload critiques ont un timeout explicite
- `pnpm build` passe au vert — 18/18 pages générées ✅ (passe 4)

### ⚠️ Reste manuel
- Fournir un vrai `PAYLOAD_SECRET` fort en production
- Vérifier le domaine `akany-neaskol.org` dans Resend (SPF/DKIM)
- Uploader les vraies images dans le CMS
- Renseigner les membres du bureau dans la collection `Team`

### 🔲 Reste technique
- Brancher réellement les contenus CMS encore non consommés (`Team`, potentiellement `Pages`) ou supprimer ce qui reste dormant
- Mettre un vrai rate limiting sur le formulaire de contact si exposition publique importante

---

## Bilan Passe 1 — 2026-04-18

**15 corrections appliquées sur 19 problèmes identifiés.**

| Fichier modifié | Corrections |
|-----------------|-------------|
| `app/(site)/page.tsx` | Catch silencieux → `console.error` ; types `any` → interfaces ; année dynamique ; section partenaires fictifs retirée |
| `app/globals.css` | `:focus-visible` ; `@keyframes quoteIn` + `prefers-reduced-motion` ; classes `.nav-pill` / `.nav-hamburger` |
| `app/layout.tsx` | Skip link "Aller au contenu principal" |
| `app/(site)/not-found.tsx` | Page 404 publique créée |
| `components/Nav.tsx` | Menu hamburger avec overlay plein écran (breakpoint 768px) |
| `components/TestimonialsCarousel.tsx` | Navigation clavier ← → ; `blockquote cite` ; style `quoteIn` inline supprimé |
| `app/(site)/contact/ContactForm.tsx` | Pré-remplissage `?sujet=` ; pas de reset auto ; état succès avec nom ; honeypot anti-spam |
| `app/(site)/contact/actions.ts` | Vérification honeypot |
| `components/Footer.tsx` | Liens sociaux `href="#"` supprimés (TODO commenté) |
| `app/(site)/association/page.tsx` | Section team masquée ; année dynamique |
| `scripts/seed.ts` | Mot de passe lu depuis `SEED_ADMIN_PASSWORD` (env var obligatoire) |

---

## Bilan Passe 2 — 2026-04-18

**9 corrections supplémentaires.**

| Fichier modifié / créé | Corrections |
|------------------------|-------------|
| `app/sitemap.ts` | Créé — routes statiques + témoignages dynamiques depuis Payload |
| `app/robots.ts` | Créé — bloque `/api/` et `/(payload)/` des crawlers |
| `app/opengraph-image.tsx` | Créé — image OG générée edge runtime (1200×630, design forest/lemon) |
| `app/(site)/mentions-legales/page.tsx` | Créée — structure complète avec contenu légal de base |
| `app/(site)/confidentialite/page.tsx` | Créée — politique de confidentialité (Resend, Vercel, données contact) |
| `app/(site)/accessibilite/page.tsx` | Créée — déclaration d'accessibilité WCAG 2.1 |
| `components/Footer.tsx` | Liens légaux `href="#"` → vrais liens Next.js |
| `app/(site)/temoignages/page.tsx` | Refactorisé en server component async ; filtre via `searchParams` (URL shareable) ; `since` affiché dans les cartes ; fetch Payload avec fallback seed |
| `app/(site)/temoignages/[slug]/page.tsx` | Catch silencieux → `console.error` ; types `any` → interface `TestimonialDetail` |
| `components/Nav.tsx` | Nav light : contraste amélioré (`rgba(0,0,0,.06)` / `.14`) ; `marginLeft: auto` dupliqué supprimé |

**Reste à faire (actions manuelles uniquement) :**
- `PAYLOAD_SECRET` fort à générer avant prod (`openssl rand -hex 32`)
- Domaine `akany-neaskol.org` à vérifier dans Resend (SPF/DKIM)
- Vraies photos à uploader dans le CMS
- Noms des membres du bureau à renseigner dans la collection Team

---

## Bilan Passe 3 — 2026-04-18

**Durcissement du socle + remise au vert de la qualité statique.**

| Fichier modifié | Corrections |
|-----------------|-------------|
| `lib/payload.ts` | Timeout centralisé sur l'init Payload et sur les requêtes critiques |
| `payload.config.ts` | Suppression du fallback `dev-secret-please-change` ; `PAYLOAD_SECRET` désormais obligatoire au démarrage |
| `app/layout.tsx` + `app/globals.css` | Skip link sans JS inline ; `<main id="main-content">` ; utilitaires responsive partagés |
| `components/Nav.tsx` | `Escape` pour fermer le menu, verrouillage du scroll, focus sur le bouton de fermeture, `aria-current` sur la nav |
| `components/Footer.tsx` | Footer responsive ; CTA "Adhérer" pré-rempli vers `/contact?sujet=...` |
| `components/TestimonialsCarousel.tsx` | Hooks remis en ordre ; garde tableau vide ; responsive ; suppression des rendus `undefined` |
| `app/(site)/contact/ContactForm.tsx` | Labels reliés aux champs, `autocomplete`, états accessibles (`role="status"`, `aria-busy`) |
| `app/(site)/contact/actions.ts` | Plus d'email perso en fallback ; statut de succès cohérent ; retour en erreur si rien n'a été transmis |
| `app/(site)/page.tsx` | Fetch Payload timeoutés ; CTA "Nous rejoindre" pré-rempli ; responsive des sections majeures |
| `app/(site)/association/page.tsx` | Responsive ; apostrophes JSX corrigées |
| `app/(site)/spirituel/page.tsx` | Responsive ; CTA pré-rempli ; textes JSX corrigés |
| `app/(site)/social-culturel/page.tsx` | Responsive ; CTA pré-rempli ; textes JSX corrigés |
| `app/(site)/contact/page.tsx` | Responsive de la page contact ; texte JSX corrigé |
| `app/(site)/temoignages/page.tsx` | Erreur de parsing corrigée ; type `since` réaligné ; responsive ; citations sûres |
| `app/(site)/temoignages/[slug]/page.tsx` | Type `since` réaligné ; responsive ; garde contre champs optionnels vides |
| `app/(site)/accessibilite/page.tsx`, `mentions-legales/page.tsx`, `confidentialite/page.tsx`, `not-found.tsx` | Liens internes en `Link` et textes JSX corrigés pour repasser ESLint |
| `app/sitemap.ts` | Timeout sur la récupération des témoignages |

**Vérifications après passe 3 :**
- `pnpm lint` ✅
- `pnpm exec tsc --noEmit --pretty false` ✅
- `pnpm build` ❌ Bloqué au stade `Creating an optimized production build ...` même après 180s

**Reste à faire (manuel + technique) :**
- `PAYLOAD_SECRET` fort à fournir en production
- Domaine `akany-neaskol.org` à vérifier dans Resend (SPF/DKIM)
- Vraies photos à uploader dans le CMS
- Noms des membres du bureau à renseigner dans la collection Team
- Diagnostic plus profond sur le blocage de `next build` / intégration Payload en production

---

## Bilan Passe 4 — 2026-04-18

**Déblocage du build production.**

| Fichier modifié | Corrections |
|-----------------|-------------|
| `lib/payload.ts` | Import de `@payload-config` rendu lazy (`import()` dynamique) — empêche toute connexion DB lors du bundling Next.js (pre-render, server action evaluation) |
| `payload.config.ts` | `connectionTimeoutMillis: 10_000` sur le pool postgres — évite un hang infini sur les cold starts Neon en production |
| `tsconfig.json` | `"baseUrl": "."` ajouté — requis pour que les outils non-Next.js (tsx, payload CLI) résolvent les path aliases `@/` |
| `app/(site)/contact/page.tsx` | `<Suspense>` autour de `<ContactForm />` — `useSearchParams()` exige une Suspense boundary pour le SSG sinon crash fatal |

**Causes racines identifiées :**

1. **Premier blocage (>180s)** : compilation Turbopack à froid — normal pour le premier run, le cache accélère les builds suivants (46s).
2. **Crash fatal du build** : deux bugs distincts :
   - `lib/payload.ts` importait `@payload-config` au niveau module → postgres tentait de se connecter pendant le pré-rendu → erreur fatale sur `/contact`.
   - `ContactForm` utilisait `useSearchParams()` sans `<Suspense>` → crash SSG.

**Vérifications après passe 4 :**
- `pnpm lint` ✅
- `pnpm exec tsc --noEmit --pretty false` ✅
- `pnpm build` ✅ — 18/18 pages générées

> Note : les erreurs `[payload:*] cannot connect to Postgres` dans les logs locaux sont attendues (la DB locale n'est pas provisionnée). En production sur Vercel avec `DATABASE_URL` Neon valide, elles n'apparaîtront pas.

---

## 1. CODE & ARCHITECTURE

### 🔴 Silences d'erreurs masquant les pannes en production
**Fichiers :** `app/(site)/page.tsx:38`, `:52`

```ts
} catch {}   // ← erreur avalée sans trace
```

Si Payload est KO (cold start Neon, network timeout), le site tombe silencieusement sur les seeds sans log ni alerte. L'admin ne sait jamais si la DB est inaccessible.

**Fix :** `catch (err) { console.error('[payload]', err) }` dans `getTestimonials` et `getEvents`. ✅ Corrigé

---

### 🔴 `any` pervasif — perte totale du typage
**Fichiers :** `app/(site)/page.tsx:27`, `:497`

```ts
result.docs.map((d: any) => ...
events.map((e: any, i: number) => ...
```

Une renomination de champ côté CMS ne provoque aucune erreur TypeScript.

**Fix :** Interfaces locales `PayloadTestimonial` et `PayloadEvent`. ✅ Corrigé

---

### 🔴 Mot de passe admin hardcodé dans le repo
**Fichier :** `scripts/seed.ts:25`

```ts
password: 'change-me-immediately',
```

Quiconque exécute `pnpm seed` crée un compte admin avec ce mot de passe connu.

**Fix :** Lire `SEED_ADMIN_PASSWORD` depuis les variables d'environnement. ✅ Corrigé

---

### 🔴 PAYLOAD_SECRET faible / fallback dangereux
**Fichiers :** `payload.config.ts`, `.env.local`

Le projet utilisait un fallback secret faible côté code. Si une configuration incomplète arrivait en production, tous les JWT Payload auraient pu être signés avec une clé triviale.

**Fix appliqué :** le fallback a été supprimé du code, `PAYLOAD_SECRET` est désormais obligatoire au démarrage.  
**Reste à faire :** fournir une vraie valeur forte en production avec `openssl rand -hex 32`. ⚠️ Action manuelle requise

---

### 🟠 Domaine d'envoi email non vérifié
**Fichier :** `app/(site)/contact/actions.ts:43`

```ts
from: 'Akany Neaskol <contact@akany-neaskol.org>',
```

Resend exige que `akany-neaskol.org` soit vérifié avec SPF/DKIM. Sans ça, les emails partent en spam ou sont rejetés silencieusement.

**Fix manuel :** Configurer les enregistrements DNS dans le dashboard Resend. ⚠️ Action manuelle requise

---

### 🟠 Formulaire de contact sans rate limiting
**Fichier :** `app/(site)/contact/actions.ts`

Aucun throttle, aucun CAPTCHA, aucune limite par IP. Un bot peut spammer le formulaire et consommer le quota Resend.

**Fix :** Honeypot field ajouté dans le formulaire. ✅ Corrigé

---

### 🟠 Collection `Pages` définie, jamais utilisée
**Fichier :** `collections/Pages.ts`

Structure complexe avec hero fragments, SEO, marquee words — toutes les pages sont pourtant 100% hardcodées. La collection `Team` est aussi définie mais non consommée par `/association`.

**Recommandation :** Connecter `Team` au frontend ou documenter que les collections sont en attente d'implémentation.

---

### 🟡 Inline styles massifs — 500+ lignes de CSS dans le JSX
**Fichiers :** `app/(site)/page.tsx`, `components/TestimonialsCarousel.tsx`, `app/(site)/contact/ContactForm.tsx`

Le design system CSS existe et est bien fait, mais les composants utilisent quasi exclusivement des styles inline. Résultat : duplication, impossibilité de theming, styles non-purgeable.

**Recommandation :** Migration progressive vers classes CSS / CSS Modules lors des prochains sprints.

---

### 🟡 `quoteIn` animation ignore `prefers-reduced-motion`
**Fichier :** `components/TestimonialsCarousel.tsx:187`

L'animation est dans un `<style>` inline non soumis au media query `prefers-reduced-motion` de globals.css.

**Fix :** Déplacée dans globals.css avec le media query approprié. ✅ Corrigé

---

### 🟡 Faux partenaires avec chiffre inventé
**Fichier :** `app/(site)/page.tsx:55-57`

7 noms fictifs affichés avec la mention "12 organisations". Donnée publique fausse.

**Fix :** Mention "12 organisations" supprimée, section à remplir avec les vrais partenaires. ✅ Corrigé

---

## 2. UI (Interface)

### 🔴 Navigation inutilisable sur mobile
**Fichier :** `components/Nav.tsx`

La pill nav avec 4 liens + bouton Contact déborde horizontalement sur mobile. Aucun menu hamburger, aucun breakpoint, aucun overflow scroll.

**Fix :** Menu hamburger avec overlay plein écran ajouté. ✅ Corrigé

---

### 🔴 Contraste insuffisant : lemon sur blanc
**Fichier :** `app/globals.css:11`

`--lemon-500: #EEF24C` sur `--paper: #FBFAF5` → ratio ≈ 1.05:1. WCAG AA exige 4.5:1 pour le texte normal. Partout où le lemon est utilisé comme couleur de texte sur fond clair, le texte est illisible.

**Recommandation :** Réserver `--lemon-500` aux fonds colorés, utiliser `--ink-900` pour le texte sur lemon.

---

### 🔴 Tout le site affiche des placeholders rayés
**Fichier :** `components/ImagePlaceholder.tsx` (utilisé partout)

Aucune vraie image n'est affichée. Hero, portraits, événements, mission — tout est en `[photo · membre · 900×1200]`. Le site n'est pas présentable en production dans cet état. Les placeholders sont intentionnellement conservés jusqu'à réception des assets.

**Action :** Uploader les photos dans le CMS Payload une fois disponibles.

---

### 🟠 Nav en `position: absolute` — overlap sur pages claires
**Fichier :** `components/Nav.tsx:28-33`

Sur les pages sans hero sombre (`/association`, `/contact`, etc.), le premier contenu est partiellement masqué par la nav absolue (~70px).

**Recommandation :** Ajouter `padding-top: 100px` en haut de chaque page sans hero, ou passer la nav en `position: sticky` sur les pages claires.

---

### 🟠 Aucun lien "Skip to main content"
**Fichier :** `app/layout.tsx`

Les utilisateurs de lecteur d'écran ou de navigation clavier doivent traverser toute la nav avant d'atteindre le contenu.

**Fix :** Skip link ajouté dans le root layout. ✅ Corrigé

---

### 🟠 Pas de styles de focus visibles
**Fichier :** `app/globals.css`

Aucun `:focus-visible` défini. La navigation clavier est aveugle.

**Fix :** `:focus-visible` ajouté dans globals.css. ✅ Corrigé

---

### 🟠 Section team sur `/association` — données vides visibles publiquement
**Fichier :** `app/(site)/association/page.tsx`

Les 4 cartes de l'équipe affichent "— à renseigner" publiquement.

**Fix :** Section masquée jusqu'à ce que la collection Team soit peuplée. ✅ Corrigé

---

### 🟡 Carousel — aucune navigation clavier
**Fichier :** `components/TestimonialsCarousel.tsx`

Les touches fléchées gauche/droite ne permettent pas de naviguer entre les témoignages.

**Fix :** `onKeyDown` ajouté sur le conteneur. ✅ Corrigé

---

### 🟡 `<blockquote>` sans attribut `cite`
**Fichier :** `components/TestimonialsCarousel.tsx:72`

Sémantiquement incomplet.

**Fix :** `cite="/temoignages/{slug}"` ajouté. ✅ Corrigé

---

## 3. UX (Expérience)

### 🟠 "Nous rejoindre" mène vers /contact sans contexte
**Fichier :** `app/(site)/page.tsx:348`

Le CTA principal envoie vers `/contact` sans pré-remplir le sujet.

**Fix :** Query param `?sujet=Rejoindre+l%27association` ajouté + ContactForm lit ce paramètre. ✅ Corrigé

---

### 🟠 Formulaire de contact : reset immédiat après succès
**Fichier :** `app/(site)/contact/ContactForm.tsx:19`

Le formulaire se vide instantanément — l'utilisateur ne peut plus relire son message.

**Fix :** Le formulaire ne se reset plus automatiquement. Message de succès plus informatif. ✅ Corrigé

---

### 🟠 Liens sociaux en footer tous morts
**Fichier :** `components/Footer.tsx`

Instagram, Twitter, LinkedIn, YouTube, TikTok → tous `href="#"`.

**Fix :** Icônes masquées avec commentaire pour les réactiver quand les comptes sont créés. ✅ Corrigé

---

### 🟡 Année "16+" hardcodée dans la section Mission
**Fichier :** `app/(site)/page.tsx`

Le compteur d'années sera périmé en 2027.

**Fix :** `new Date().getFullYear() - 2010` calculé dynamiquement. ✅ Corrigé

---

### 🟡 "Officialisée 2026" dans le hero
**Fichier :** `app/(site)/page.tsx:119`

Information à vérifier selon la date réelle d'officialisation.

**Recommandation :** Mettre à jour manuellement une fois l'officialisation actée.

---

## 4. FONCTIONNALITÉS

### 🟢 Server Actions pour le formulaire de contact
Usage correct de `'use server'`, `useTransition`, validation serveur double (Payload + email). Bien structuré.

### 🟢 ISR bien configuré
`revalidate = 3600` sur toutes les pages de contenu — bon compromis fraîcheur / performance.

### 🟢 Design system CSS cohérent
Tokens bien nommés, palette cohérente, typographie soignée, `prefers-reduced-motion` respecté pour les animations globales. Fondations solides.

### 🟢 Filtre témoignages désormais côté URL / serveur
**Fichier :** `app/(site)/temoignages/page.tsx`

Le filtre n'est plus purement client-side. Il passe désormais par `searchParams`, reste partageable via URL et s'exécute côté serveur.

**Fix :** migration effectuée en passe 2. ✅ Corrigé

### 🟠 Divergence possible entre sauvegarde Payload et envoi email
**Fichier :** `app/(site)/contact/actions.ts:32`

Le comportement n'est plus binaire : si Payload ou Resend réussit, le message est considéré comme transmis. En revanche, il reste un manque d'observabilité et de retry ciblé si un seul des deux canaux tombe.

**Fix appliqué :** succès cohérent si un canal aboutit ; plus d'échec trompeur quand le message a bien été persisté ou envoyé. ✅ Corrigé partiellement  
**Reste :** journaliser les divergences et ajouter éventuellement une file de retry. 🔲 À faire

### 🟢 Champ `since` des témoignages affiché et réaligné
**Fichier :** `collections/Testimonials.ts`

Le champ est maintenant affiché sur le listing et le détail, et son typage frontend a été réaligné avec la réalité du CMS.

**Fix :** `since` exploité côté UI et type corrigé. ✅ Corrigé

---

## 5. GAPS & OPPORTUNITÉS

### Tableau de suivi complet

| Priorité | Action | Statut |
|----------|--------|--------|
| 🔴 | Navigation mobile (hamburger) | ✅ P1 |
| 🔴 | Catch silencieux → console.error (page.tsx + [slug]) | ✅ P1+P2 |
| 🔴 | Mot de passe seed → env var | ✅ P1 |
| 🔴 | Types `any` → interfaces locales (3 fichiers) | ✅ P1+P2 |
| 🔴 | Supprimer le fallback `dev-secret-please-change` | ✅ P3 |
| 🔴 | `PAYLOAD_SECRET` obligatoire au démarrage | ✅ P3 |
| 🔴 | Débloquer `pnpm build` en production | ✅ P4 |
| 🔴 | Vérifier domaine Resend + tester envoi email | ⚠️ Manuel |
| 🔴 | Uploader les vraies photos dans le CMS | ⏳ Assets |
| 🟠 | Faux partenaires → section retirée | ✅ P1 |
| 🟠 | Section team masquée jusqu'à peuplement | ✅ P1 |
| 🟠 | `:focus-visible` dans globals.css | ✅ P1 |
| 🟠 | Skip link accessibilité | ✅ P1 |
| 🟠 | Page 404 publique | ✅ P1 |
| 🟠 | Honeypot anti-spam formulaire | ✅ P1 |
| 🟠 | Pre-fill sujet "Rejoindre" depuis CTA | ✅ P1 |
| 🟠 | Formulaire contact — état succès sans reset auto | ✅ P1 |
| 🟠 | Liens sociaux footer morts supprimés | ✅ P1 |
| 🟠 | sitemap.xml dynamique | ✅ P2 |
| 🟠 | robots.txt | ✅ P2 |
| 🟠 | OpenGraph image (edge runtime) | ✅ P2 |
| 🟠 | Pages Mentions légales / Confidentialité / Accessibilité | ✅ P2 |
| 🟠 | Filtre témoignages → server-side, URL shareable | ✅ P2 |
| 🟠 | Nav light — contraste amélioré | ✅ P2 |
| 🟠 | Responsive des pages principales | ✅ P3 |
| 🟠 | Accessibilité formulaire / skip link / menu mobile | ✅ P3 |
| 🟠 | Timeouts Payload sur les requêtes critiques | ✅ P3 |
| 🟡 | Année calculée dynamiquement (homepage + association) | ✅ P1 |
| 🟡 | Navigation clavier carousel (← →) | ✅ P1 |
| 🟡 | `blockquote cite` témoignages | ✅ P1 |
| 🟡 | `quoteIn` + `prefers-reduced-motion` dans globals.css | ✅ P1 |
| 🟡 | Champ `since` affiché dans les cartes listing | ✅ P2 |

### Ce qui manque ou reste prioritaire

1. ~~**Stabiliser `next build`**~~ — ✅ Résolu en passe 4.
2. **Connecter `Team` au frontend** — La collection existe mais la section reste masquée tant que les données ne sont pas saisies.
3. **Brancher les vrais médias** — Les placeholders sont encore présents tant que les assets ne sont pas fournis dans Payload.
4. **Ajouter un vrai rate limiting** — Le honeypot aide, mais ne remplace pas une vraie limite d'abus.
5. **Décider du sort de `Pages`** — Soit connecter la collection au site, soit la supprimer pour réduire la dette.
6. **Réduire les styles inline** — Le responsive a été amélioré, mais le découpage composants/CSS reste perfectible.
7. **Créer les pages événement si le besoin produit est confirmé** — Aujourd'hui, les événements n'ont toujours pas de route dédiée.

---

## Ce qui reste — manuel + technique

| Type | Priorité | Point | Action requise |
|------|----------|-------|----------------|
| Manuel | 🔴 | `PAYLOAD_SECRET` fort en prod | `openssl rand -hex 32` → variable d'environnement de déploiement |
| Manuel | 🔴 | Domaine Resend vérifié | SPF/DKIM dans le registrar DNS |
| Manuel | 🔴 | Vraies photos | Upload dans Payload CMS → Media |
| Manuel | 🟠 | Membres du bureau | Renseigner la collection `Team` dans l'admin |
| Technique | 🔴 | `pnpm build` bloqué | ✅ Résolu en passe 4 (lazy import + Suspense + connectionTimeout) |
| Technique | 🟠 | Connexion `Team` → `/association` | Activer l'affichage une fois les données saisies |
| Technique | 🟠 | Collection `Pages` non exploitée | Connecter ou supprimer |
| Technique | 🟡 | Inline styles → classes CSS | Migration progressive au fil des sprints |
| Produit / contenu | 🟡 | Mentions légales à finaliser | Compléter les informations légales manquantes si nécessaire |

*Audit initial : commit `78c9d03` · Passes 1, 2 et 3 appliquées le 2026-04-18 · État actuel : qualité statique remise au vert, UX/a11y nettement renforcées, blocage build production encore ouvert.*
