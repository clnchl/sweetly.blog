import { AdminHeader } from "@/components/admin/admin-header";
import { RecipeForm } from "@/components/admin/recipe-form";
import { requireAdminPage } from "@/lib/admin-auth";
import { getAdminCategories } from "@/lib/recipes-data";

export default async function NewRecipePage() {
  await requireAdminPage();
  const categories = await getAdminCategories();
  return <>
    <AdminHeader />
    <RecipeForm categories={categories} />
  </>;
}
