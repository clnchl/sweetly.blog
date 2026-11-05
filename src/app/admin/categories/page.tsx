import { AdminHeader } from "@/components/admin/admin-header";
import { CategoryManager } from "@/components/admin/category-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { getAdminCategories } from "@/lib/recipes-data";

export default async function CategoriesPage() {
  await requireAdminPage();
  const categories = await getAdminCategories();
  return <>
    <AdminHeader />
    <CategoryManager categories={categories} />
  </>;
}
