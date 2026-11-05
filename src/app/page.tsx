import { HomeView } from "@/components/home-view";
import { getCategoryFilters, getPublishedRecipes } from "@/lib/recipes-data";

export const revalidate = 3600;

export default async function Home() {
    const [recipes, categories] = await Promise.all([getPublishedRecipes(), getCategoryFilters()]);
    return <HomeView recipes={recipes} categories={categories} />;
}
