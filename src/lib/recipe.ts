import type { Recipe as DbRecipe } from "@prisma/client";
import { z } from "zod";

export const recipePlaceholderImage = "/recette-sans-photo.svg";

export type Recipe = {
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  prep: string;
  bake: string;
  servings: string;
  ingredients: string[];
  utensils: string[];
  instructions: string[];
};

export type AdminRecipe = {
  slug: string;
  title: string;
  categoryId: string;
  category: string;
  image: string | null;
  description: string;
  prep: string;
  bake: string;
  servings: string;
  published: boolean;
  ingredients: string[];
  utensils: string[];
  instructions: string[];
};

export type RecipeWithDetails = DbRecipe & {
  category: { name: string };
  ingredients: { quantity: string; unit: string | null; name: string }[];
  utensils: { name: string }[];
  instructions: { content: string }[];
};

export const recipeDetails = {
  category: true,
  ingredients: { orderBy: { order: "asc" as const } },
  utensils: { orderBy: { order: "asc" as const } },
  instructions: { orderBy: { step: "asc" as const } },
};

function ingredientLabel(ingredient: RecipeWithDetails["ingredients"][number]) {
  return [ingredient.quantity, ingredient.unit, ingredient.name].filter(Boolean).join(" ");
}

export function toRecipe(recipe: RecipeWithDetails): Recipe {
  return {
    slug: recipe.slug,
    title: recipe.title,
    category: recipe.category.name,
    image: recipe.image ?? recipePlaceholderImage,
    description: recipe.description ?? "",
    prep: recipe.preparationTime,
    bake: recipe.cookingTime ?? "Non indiquée",
    servings: recipe.servings,
    ingredients: recipe.ingredients.map(ingredientLabel),
    utensils: recipe.utensils.map((utensil) => utensil.name),
    instructions: recipe.instructions.map((instruction) => instruction.content),
  };
}

export function toAdminRecipe(recipe: RecipeWithDetails): AdminRecipe {
  return {
    slug: recipe.slug,
    title: recipe.title,
    categoryId: recipe.categoryId,
    category: recipe.category.name,
    image: recipe.image,
    description: recipe.description ?? "",
    prep: recipe.preparationTime,
    bake: recipe.cookingTime ?? "",
    servings: recipe.servings,
    published: recipe.published,
    ingredients: recipe.ingredients.map(ingredientLabel),
    utensils: recipe.utensils.map((utensil) => utensil.name),
    instructions: recipe.instructions.map((instruction) => instruction.content),
  };
}

export function slugify(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function isBlobUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

const textList = z.array(z.string().trim().min(1).max(5000)).max(200);

export const recipeInput = z.object({
  title: z.string().trim().min(1).max(160),
  categoryId: z.string().min(1),
  image: z.string().refine(isBlobUrl).nullable(),
  description: z.string().trim().max(2000),
  prep: z.string().trim().min(1).max(120),
  bake: z.string().trim().max(120),
  servings: z.string().trim().min(1).max(120),
  published: z.boolean(),
  ingredients: textList,
  utensils: textList,
  instructions: textList,
});

export type RecipeInput = z.infer<typeof recipeInput>;

export function recipeWriteData(data: RecipeInput) {
  return {
    title: data.title,
    description: data.description,
    image: data.image,
    servings: data.servings,
    preparationTime: data.prep,
    cookingTime: data.bake || null,
    published: data.published,
    categoryId: data.categoryId,
  };
}

export function recipeChildren(data: RecipeInput) {
  return {
    ingredients: data.ingredients.map((name, order) => ({ name, quantity: "", order })),
    utensils: data.utensils.map((name, order) => ({ name, order })),
    instructions: data.instructions.map((content, index) => ({ content, step: index + 1 })),
  };
}
