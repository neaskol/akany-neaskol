# Guide de déploiement — Akany Neaskol

## 1. Prérequis (une seule fois)

- Un compte [GitHub](https://github.com)
- Un compte [Vercel](https://vercel.com)
- Un compte [Neon](https://neon.tech) (base de données gratuite)
- Un compte [Resend](https://resend.com) (emails gratuits, 3 000/mois)

---

## 2. Base de données Neon (gratuit)

1. Se connecter sur [neon.tech](https://neon.tech)
2. Créer un projet (ex: `akany-neaskol`)
3. Copier la **connection string** depuis l'onglet "Connection Details"  
   Elle ressemble à : `postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require`
4. La mettre dans `.env.local` → `DATABASE_URL=...`

---

## 3. Resend (emails)

1. Créer un compte sur [resend.com](https://resend.com)
2. Créer une API Key
3. La mettre dans `.env.local` → `RESEND_API_KEY=re_...`
4. Optionnel : vérifier un domaine pour envoyer depuis `@akany-neaskol.org`  
   En attendant, Resend envoie depuis `onboarding@resend.dev`

---

## 4. Développement local

```bash
# Copier les variables d'environnement
cp .env.example .env.local
# Remplir DATABASE_URL et PAYLOAD_SECRET dans .env.local

# Installer les dépendances
pnpm install

# Lancer le serveur de dev
pnpm dev
# → http://localhost:3000 (site public)
# → http://localhost:3000/admin (Payload CMS)

# Peupler la base avec les données initiales (à faire une seule fois)
pnpm seed
```

---

## 5. Déploiement sur Vercel

### 5a. Pousser sur GitHub

```bash
cd /chemin/vers/akany-neaskol
git init  # déjà fait par create-next-app
git add .
git commit -m "Initial commit — Akany Neaskol"
# Créer un repo sur github.com, puis :
git remote add origin https://github.com/TON_USERNAME/akany-neaskol.git
git push -u origin main
```

### 5b. Connecter à Vercel

1. Aller sur [vercel.com/new](https://vercel.com/new)
2. Importer le repo GitHub `akany-neaskol`
3. Framework : **Next.js** (détecté automatiquement)
4. Ajouter les variables d'environnement :

| Variable | Valeur |
|---|---|
| `DATABASE_URL` | connection string Neon |
| `PAYLOAD_SECRET` | chaîne aléatoire ≥ 32 caractères |
| `RESEND_API_KEY` | API key Resend |
| `CONTACT_TO_EMAIL` | `herv.rakotoarisoa@gmail.com` |
| `NEXT_PUBLIC_SITE_URL` | `https://akany-neaskol.vercel.app` |
| `BLOB_READ_WRITE_TOKEN` | voir étape suivante |

5. Cliquer **Deploy**

### 5c. Vercel Blob (images)

Après le premier déploiement :
1. Tableau de bord Vercel → **Storage** → **Create Database** → **Blob**
2. Nommer le store `akany-neaskol-media`
3. Connecter au projet → `BLOB_READ_WRITE_TOKEN` est ajouté automatiquement
4. Redéployer

### 5d. Seed en production

Après le premier déploiement réussi, exécuter le seed depuis la machine locale :

```bash
DATABASE_URL="<neon-url>" PAYLOAD_SECRET="<ta-clé>" pnpm seed
```

Ou utiliser la console SQL de Neon pour vérifier que les tables ont été créées.

---

## 6. Premier accès à l'admin

1. Aller sur `https://ton-site.vercel.app/admin`
2. Créer un compte administrateur (à la première visite)  
   — si le seed a été lancé : email `admin@akany-neaskol.org`, mot de passe `change-me-immediately`
3. **Changer le mot de passe immédiatement** dans Profil → Mot de passe

---

## 7. Ce que tu peux faire dans l'admin

| Section | Action |
|---|---|
| **Témoignages** | Ajouter, modifier, publier ou mettre en brouillon |
| **Agenda** | Ajouter des événements, définir la date et le pilier |
| **Bureau** | Ajouter les membres du bureau avec leur portrait |
| **Pages** | Modifier les titres hero, les textes de mission |
| **Médiathèque** | Uploader des photos (portraits, hero, événements) |
| **Messages** | Lire les messages envoyés via le formulaire de contact |

---

## 8. Ajouter un domaine custom (quand tu en auras un)

1. Acheter un domaine (ex: `akany-neaskol.mg` ou `.org`)
2. Vercel → Settings → Domains → Ajouter le domaine
3. Suivre les instructions DNS (ajouter un enregistrement `A` ou `CNAME` chez le registrar)
4. Mettre à jour `NEXT_PUBLIC_SITE_URL` dans les variables Vercel

---

## 9. Mettre à jour le site

```bash
# Faire les modifications en local
pnpm dev  # tester

# Pousser sur GitHub
git add .
git commit -m "Description des changements"
git push

# → Vercel déploie automatiquement en 1-2 minutes
```
