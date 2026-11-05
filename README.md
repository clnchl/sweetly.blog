# Sweetly

Blog de recettes (Next.js, Prisma Postgres, Vercel Blob), hébergé sur Vercel.

En local : `npm install`, puis `npm run dev`, puis http://localhost:3000.

## Administration

L'espace d'administration est accessible sur `/admin`. Les recettes sont stockées dans la base Postgres (Prisma) et les photos sur Vercel Blob : aucune modification de contenu ne nécessite de commit ni de redéploiement.

Variables d'environnement requises : voir `.env.example`.

- Changer le mot de passe : `npm run admin:password`, puis remplacer `ADMIN_PASSWORD_HASH_B64` sur Vercel et redéployer.
- Déconnecter toutes les sessions : remplacer `AUTH_SECRET` sur Vercel et redéployer.
- Appliquer les migrations de la base : `npm run db:deploy`.
