import { prisma } from "@/lib/prisma";
import { recipeDetails, toAdminRecipe, toRecipe } from "@/lib/recipe";

export async function getPublishedRecipes() {
  const recipes = await prisma.recipe.findMany({ where: { published: true }, include: recipeDetails, orderBy: { createdAt: "desc" } });
  return recipes.map(toRecipe);
}

export async function getPublishedRecipe(slug: string) {
  const recipe = await prisma.recipe.findFirst({ where: { slug, published: true }, include: recipeDetails });
  return recipe ? toRecipe(recipe) : null;
}

export async function getCategoryFilters() {
  const categories = await prisma.category.findMany({ orderBy: { createdAt: "asc" }, select: { name: true } });
  return ["Toutes", ...categories.map((category) => category.name)];
}

export async function getAdminRecipes() {
  const recipes = await prisma.recipe.findMany({ include: recipeDetails, orderBy: { createdAt: "desc" } });
  return recipes.map(toAdminRecipe);
}

export async function getAdminRecipe(slug: string) {
  const recipe = await prisma.recipe.findUnique({ where: { slug }, include: recipeDetails });
  return recipe ? toAdminRecipe(recipe) : null;
}

export async function getAdminCategories() {
  const categories = await prisma.category.findMany({ orderBy: { createdAt: "asc" }, include: { _count: { select: { recipes: true } } } });
  return categories.map((category) => ({ id: category.id, name: category.name, recipeCount: category._count.recipes }));
}
