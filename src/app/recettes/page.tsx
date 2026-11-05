import { RecipesView } from "@/components/recipes-view";
import { getCategoryFilters, getPublishedRecipes } from "@/lib/recipes-data";

export const revalidate = 3600;

export default async function RecipesPage() {
    const [recipes, categories] = await Promise.all([getPublishedRecipes(), getCategoryFilters()]);
    return <RecipesView recipes={recipes} categories={categories} />;
}
