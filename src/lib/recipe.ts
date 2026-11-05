import type { Recipe as DbRecipe } from "@prisma/client";

export type Recipe = {
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  prep: string;
  bake: string;
  servings: string;
  likes: number;
  ingredients: string[];
  utensils: string[];
  instructions: string[];
};

type RecipeWithDetails = DbRecipe & {
  category: { name: string };
  ingredients: { quantity: string; unit: string | null; name: string }[];
  utensils: { name: string }[];
  instructions: { content: string }[];
};

export function toRecipe(recipe: RecipeWithDetails): Recipe {
  return {
    slug: recipe.slug,
    title: recipe.title,
    category: recipe.category.name,
    image: recipe.image,
    description: recipe.description ?? "",
    prep: `${recipe.preparationTime} min`,
    bake: recipe.cookingTime === null ? "Non indiquée" : `${recipe.cookingTime} min`,
    servings: recipe.servings,
    likes: recipe.likes,
    ingredients: recipe.ingredients.map((ingredient) => [ingredient.quantity, ingredient.unit, ingredient.name].filter(Boolean).join(" ")),
    utensils: recipe.utensils.map((utensil) => utensil.name),
    instructions: recipe.instructions.map((instruction) => instruction.content),
  };
}

export function minutes(value: string) {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
}
