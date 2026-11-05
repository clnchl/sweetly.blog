import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { RecipeForm } from "@/components/admin/recipe-form";
import { requireAdminPage } from "@/lib/admin-auth";
import { getAdminCategories, getAdminRecipe } from "@/lib/recipes-data";

export default async function EditRecipePage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdminPage();
  const { slug } = await params;
  const [recipe, categories] = await Promise.all([getAdminRecipe(slug), getAdminCategories()]);
  if (!recipe) notFound();
  return <>
    <AdminHeader />
    <RecipeForm key={recipe.slug} recipe={recipe} categories={categories} />
  </>;
}
