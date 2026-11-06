-- Recette mise en avant sur l'accueil ("La recette du moment").
ALTER TABLE "Recipe" ADD COLUMN "featured" BOOLEAN NOT NULL DEFAULT false;

-- Conserve la recette actuellement affichée.
UPDATE "Recipe" SET "featured" = true WHERE "slug" = 'moelleux-au-chocolat';
