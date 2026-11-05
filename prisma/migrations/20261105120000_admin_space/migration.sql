-- Temps de préparation et de cuisson : texte libre ("25 min + 2 h de levée").
ALTER TABLE "Recipe" ALTER COLUMN "preparationTime" TYPE TEXT USING "preparationTime"::TEXT;
ALTER TABLE "Recipe" ALTER COLUMN "cookingTime" TYPE TEXT USING "cookingTime"::TEXT;

-- Une recette peut ne pas avoir de photo.
ALTER TABLE "Recipe" ALTER COLUMN "image" DROP NOT NULL;

-- Publication / brouillon.
ALTER TABLE "Recipe" ADD COLUMN "published" BOOLEAN NOT NULL DEFAULT true;

-- Le bouton "j'aime" est retiré du site.
ALTER TABLE "Recipe" DROP COLUMN "likes";

-- CreateTable
CREATE TABLE "AdminSession" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginAttempt" (
    "key" TEXT NOT NULL,
    "failures" INTEGER NOT NULL DEFAULT 0,
    "windowStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginAttempt_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminSession_tokenHash_key" ON "AdminSession"("tokenHash");
