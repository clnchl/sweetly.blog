import { readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";

function loadEnvironment() {
  for (const line of readFileSync(".env", "utf8").split(/\r?\n/)) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (!match) continue;
    process.env[match[1]] ??= match[2].replace(/^"|"$/g, "");
  }
}

function slugify(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
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

function minutes(value) {
  const match = String(value ?? "").match(/\d+/);
  return match ? Number(match[0]) : 0;
}

loadEnvironment();
const prisma = new PrismaClient();
const source = readFileSync("src/data/recipes.ts", "utf8");
const start = source.indexOf("const sourceRecipes = ") + "const sourceRecipes = ".length;
const end = source.indexOf("\n];\n\nfunction slugify", start) + 2;
const recipes = JSON.parse(source.slice(start, end));

let created = 0;
let skipped = 0;
for (const sourceRecipe of recipes) {
  const slug = slugify(sourceRecipe.nom);
  if (await prisma.recipe.findUnique({ where: { slug }, select: { id: true } })) { skipped++; continue; }
  const categoryName = categoryFor(`${sourceRecipe.nom} ${sourceRecipe.categorie ?? "desserts"}`);
  const category = await prisma.category.upsert({ where: { name: categoryName }, update: {}, create: { name: categoryName, slug: slugify(categoryName) } });
  const ingredients = ingredientsFor(sourceRecipe);
  await prisma.recipe.create({ data: {
    title: sourceRecipe.nom, slug, categoryId: category.id,
    image: `https://sweetlybyceline.vercel.app/${sourceRecipe.image}`,
    description: `Une recette maison Sweetly à découvrir dans la catégorie ${categoryName.toLowerCase()}.`,
    servings: sourceRecipe.quantité ?? "Non indiquée", preparationTime: minutes(sourceRecipe.prepTime), cookingTime: sourceRecipe.cookTime ? minutes(sourceRecipe.cookTime) : null,
    ingredients: { create: ingredients.map((name, order) => ({ name, quantity: "", order })) },
    utensils: { create: (sourceRecipe.ustensiles ?? []).map((name, order) => ({ name, order })) },
    instructions: { create: (sourceRecipe.instructions ?? []).map((content, index) => ({ content, step: index + 1 })) },
  } });
  created++;
}
await prisma.$disconnect();
console.log(`${created} recettes importées, ${skipped} déjà présentes.`);
