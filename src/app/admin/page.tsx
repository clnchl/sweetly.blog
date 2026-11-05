import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { AdminHeader } from "@/components/admin/admin-header";
import { LoginForm } from "@/components/admin/login-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAdminCategories, getAdminRecipes } from "@/lib/recipes-data";

const notices: Record<string, string> = {
  created: "Recette ajoutée.",
  updated: "Recette enregistrée.",
};

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  if (!await isAdminAuthenticated()) return <LoginForm />;

  const [recipes, categories, { ok }] = await Promise.all([getAdminRecipes(), getAdminCategories(), searchParams]);
  return <>
    <AdminHeader />
    <AdminDashboard recipes={recipes} categories={categories} notice={ok ? notices[ok] : undefined} />
  </>;
}
