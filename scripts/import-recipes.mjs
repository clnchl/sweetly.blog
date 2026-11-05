// Importe les recettes de src/data/recipes.ts dans la base et copie leurs photos sur Vercel Blob.
// Peut être relancé sans risque : une recette déjà présente n'est jamais modifiée.
import { readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";
import sharp from "sharp";

const oldSite = "https://sweetlybyceline.vercel.app/";
const categoryOrder = ["Gâteaux & desserts", "Boissons", "Pâtes", "Crèmes", "Desserts asiatiques"];

function loadEnvironment() {
  for (const file of [".env.local", ".env"]) {
    for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) process.env[match[1]] ??= match[2].replace(/^"|"$/g, "");
    }
  }
}

function slugify(value) {
  return value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function categoryFor(value) {
  const category = value.toLowerCase();
  if (category.includes("asiatique")) return "Desserts asiatiques";
  if (category.includes("boisson") || category.includes("sirop") || category.includes("café glacé") || category.includes("cafe glace") || category.includes("matcha brown sugar") || category.includes("tapioca")) return "Boissons";
  if (category.includes("boudoir")) return "Gâteaux & desserts";
  if (category.includes("pate") || category.includes("pâte")) return "Pâtes";
  if (category.includes("crème") || category.includes("creme") || category.includes("mascarpone")) return "Crèmes";
  return "Gâteaux & desserts";
}

function ingredientsFor(recipe) {
  if (recipe.ingredientGroups) return Object.entries(recipe.ingredientGroups).flatMap(([group, items]) => !items ? [] : group === "Ingrédients" ? items : items.map((item) => `${group}: ${item}`));
  return recipe.ingredients ?? [];
}

async function copyPhoto(slug, path) {
  const response = await fetch(oldSite + path);
  if (!response.ok) return null;
  const photo = await sharp(Buffer.from(await response.arrayBuffer())).rotate().resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 84, mozjpeg: true }).toBuffer();
  const blob = await put(`recettes/${slug}.jpg`, photo, { access: "public", contentType: "image/jpeg", addRandomSuffix: true });
  return blob.url;
}

loadEnvironment();
const prisma = new PrismaClient();
const source = readFileSync("src/data/recipes.ts", "utf8");
const start = source.indexOf("const sourceRecipes = ") + "const sourceRecipes = ".length;
const end = source.indexOf("\n];\n\nfunction slugify", start) + 2;
const recipes = JSON.parse(source.slice(start, end));

// L'ordre de création fixe l'ordre des filtres sur le site.
const baseTime = Date.now() - 86_400_000;
for (const [index, name] of categoryOrder.entries()) {
  await prisma.category.upsert({ where: { name }, update: {}, create: { name, slug: slugify(name), createdAt: new Date(baseTime + index * 1000) } });
}

let created = 0;
let skipped = 0;
const withoutPhoto = [];
for (const [index, sourceRecipe] of recipes.entries()) {
  const slug = slugify(sourceRecipe.nom);
  if (await prisma.recipe.findUnique({ where: { slug }, select: { id: true } })) { skipped++; continue; }
  const categoryName = categoryFor(`${sourceRecipe.nom} ${sourceRecipe.categorie ?? "desserts"}`);
  const category = await prisma.category.findUniqueOrThrow({ where: { name: categoryName } });
  const image = await copyPhoto(slug, sourceRecipe.image);
  if (!image) withoutPhoto.push(sourceRecipe.nom);
  await prisma.recipe.create({ data: {
    title: sourceRecipe.nom, slug, categoryId: category.id, image,
    description: `Une recette maison Sweetly à découvrir dans la catégorie ${categoryName.toLowerCase()}.`,
    servings: sourceRecipe.quantité ?? "Non indiqué",
    preparationTime: sourceRecipe.prepTime ?? "Non indiqué",
    cookingTime: sourceRecipe.cookTime ?? null,
    // Les recettes sont listées de la plus récente à la plus ancienne : on conserve l'ordre actuel du site.
    createdAt: new Date(baseTime - index * 1000),
    ingredients: { create: ingredientsFor(sourceRecipe).map((name, order) => ({ name, quantity: "", order })) },
    utensils: { create: (sourceRecipe.ustensiles ?? []).map((name, order) => ({ name, order })) },
    instructions: { create: (sourceRecipe.instructions ?? []).map((content, position) => ({ content, step: position + 1 })) },
  } });
  created++;
  console.log(`${created}. ${sourceRecipe.nom}${image ? "" : " (sans photo)"}`);
}
await prisma.$disconnect();
console.log(`${created} recettes importées, ${skipped} déjà présentes, ${withoutPhoto.length} sans photo.`);
