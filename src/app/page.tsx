import { HomeView } from "@/components/home-view";
import { getPublishedRecipes } from "@/lib/recipes-data";

export const revalidate = 3600;

export const metadata = { title: "Sweetly - Accueil" };

export default async function Home() {
    const recipes = await getPublishedRecipes();
    return <HomeView recipes={recipes} />;
}
