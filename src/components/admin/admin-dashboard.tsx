"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { recipePlaceholderImage, type AdminRecipe } from "@/lib/recipe";

type Category = { id: string; name: string; recipeCount: number };
type StatusFilter = "all" | "published" | "draft";

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "published", label: "Publiées" },
  { value: "draft", label: "Brouillons" },
];

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function AdminDashboard({ recipes, categories, notice }: { recipes: AdminRecipe[]; categories: Category[]; notice?: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(notice ?? "");

  const filtered = useMemo(() => {
    const search = normalize(query.trim());
    return recipes.filter((recipe) => {
      if (status === "published" && !recipe.published) return false;
      if (status === "draft" && recipe.published) return false;
      if (categoryId && recipe.categoryId !== categoryId) return false;
      return normalize(`${recipe.title} ${recipe.category} ${recipe.ingredients.join(" ")}`).includes(search);
    });
  }, [recipes, query, status, categoryId]);

  const publishedCount = recipes.filter((recipe) => recipe.published).length;
  const withoutPhotoCount = recipes.filter((recipe) => !recipe.image).length;

  async function run(action: () => Promise<Response>, success: string) {
    setError("");
    setMessage("");
    try {
      const response = await action();
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.error ?? "L'opération a échoué. Réessaie.");
        return;
      }
      setMessage(success);
      startTransition(() => router.refresh());
    } catch {
      setError("Connexion impossible. Vérifie ta connexion internet.");
    }
  }

  function togglePublished(recipe: AdminRecipe) {
    void run(
      () => fetch(`/api/recipes/${recipe.slug}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ published: !recipe.published }) }),
      recipe.published ? `« ${recipe.title} » n'est plus visible sur le site.` : `« ${recipe.title} » est publiée.`,
    );
  }

  function deleteRecipe(recipe: AdminRecipe) {
    if (!window.confirm(`Supprimer définitivement « ${recipe.title} » et sa photo ?\n\nCette action est irréversible.`)) return;
    void run(() => fetch(`/api/recipes/${recipe.slug}`, { method: "DELETE" }), `« ${recipe.title} » a été supprimée.`);
  }

  return <main className="site-shell !py-10 md:!py-12">
    <p className="eyebrow">Espace créateur</p>
    <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <h1 className="display text-5xl font-semibold md:text-6xl">Le tableau de bord</h1>
      <Link href="/admin/recettes/nouvelle" className="self-start rounded-full bg-[var(--foreground)] px-5 py-3 !text-sm !font-bold !text-white hover:bg-[var(--rose-dark)] md:self-auto">+ Ajouter une recette</Link>
    </div>

    {message && <p role="status" className="mt-6 rounded-xl bg-green-100 px-4 py-3 text-sm font-semibold text-green-800">{message}</p>}
    {error && <p role="alert" className="mt-6 rounded-xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-800">{error}</p>}

    <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <Stat label="Recettes publiées" value={publishedCount} />
      <Stat label="Brouillons" value={recipes.length - publishedCount} />
      <Stat label="Catégories" value={categories.length} />
      <Stat label="Sans photo" value={withoutPhotoCount} />
    </div>

    <section className="mt-8 rounded-[24px] bg-white p-5 md:p-6">
      <h2 className="display text-3xl font-semibold">Mes recettes</h2>
      <div className="mt-5 flex flex-col gap-3 lg:flex-row">
        <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" aria-label="Rechercher une recette" placeholder="Rechercher une recette..." className="min-w-0 flex-1 rounded-full border border-[var(--line)] bg-white px-5 py-3 text-sm outline-none focus:border-[var(--rose)]" />
        <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)} aria-label="Filtrer par catégorie" className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[var(--rose)]">
          <option value="">Toutes les catégories</option>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        <div className="flex gap-2 overflow-x-auto">
          {statusFilters.map((item) => <button key={item.value} type="button" onClick={() => setStatus(item.value)} className={`whitespace-nowrap rounded-full border px-4 py-3 !text-sm !font-semibold ${status === item.value ? "border-[var(--foreground)] bg-[var(--foreground)] text-white" : "border-[var(--line)] bg-white"}`}>{item.label}</button>)}
        </div>
      </div>

      <p className="mt-5 text-sm text-[var(--ink-soft)]">{filtered.length} recette{filtered.length > 1 ? "s" : ""}</p>
      <ul className="mt-2 divide-y divide-[var(--line)]">
        {filtered.map((recipe) => <li key={recipe.slug} className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={recipe.image ?? recipePlaceholderImage} alt="" loading="lazy" className="h-14 w-14 flex-none rounded-xl object-cover" />
            <div className="min-w-0">
              <p className="truncate font-semibold">{recipe.title}</p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">
                {recipe.category} · <span className={recipe.published ? "text-green-800" : "font-semibold text-[var(--rose-dark)]"}>{recipe.published ? "Publiée" : "Brouillon"}</span>
                {!recipe.image && " · Sans photo"}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/admin/recettes/${recipe.slug}`} className="rounded-full border border-[var(--line)] px-4 py-2 !text-sm !font-bold">Modifier</Link>
            <button type="button" disabled={pending} onClick={() => togglePublished(recipe)} className="rounded-full border border-[var(--line)] px-4 py-2 !text-sm !font-bold disabled:opacity-60">{recipe.published ? "Dépublier" : "Publier"}</button>
            <button type="button" disabled={pending} onClick={() => deleteRecipe(recipe)} className="px-2 py-2 !text-sm !font-bold text-[var(--rose-dark)] disabled:opacity-60">Supprimer</button>
          </div>
        </li>)}
      </ul>
      {filtered.length === 0 && <p className="py-12 text-center text-[var(--ink-soft)]">Aucune recette trouvée.</p>}
    </section>
  </main>;
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="rounded-2xl bg-white p-5 md:p-6">
    <p className="text-sm text-[var(--ink-soft)]">{label}</p>
    <strong className="display mt-2 block text-4xl">{value}</strong>
  </div>;
}
