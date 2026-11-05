"use client";

import { useMemo, useState } from "react";
import type { Recipe } from "@/lib/recipe";
import { RecipeCard } from "@/components/recipe-card";
import { SiteHeader } from "@/components/site-header";

export function RecipesView({ recipes, categories }: { recipes: Recipe[]; categories: string[] }) {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("Toutes");
    const filtered = useMemo(() => recipes.filter((recipe) => {
        const matchesCategory = category === "Toutes" || recipe.category === category;
        const haystack = `${recipe.title} ${recipe.category} ${recipe.description} ${recipe.ingredients.join(" ")}`.toLowerCase();
        return matchesCategory && haystack.includes(query.toLowerCase());
    }), [category, query, recipes]);

    return <><SiteHeader /><main className="site-shell py-16 md:py-24"><p className="eyebrow">Le carnet complet</p><h1 className="display mt-4 text-6xl font-semibold md:text-8xl">Toutes les recettes</h1><p className="mt-5 max-w-xl text-lg leading-8 text-[var(--ink-soft)]">Des recettes pensées pour être faites, refaites et partagées sans cérémonie.</p><div className="mt-12 flex flex-col gap-4 rounded-[24px] border border-[var(--line)] bg-[#ffe3e3] p-4 md:flex-row"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nom, ingrédient, catégorie..." className="min-w-0 flex-1 rounded-full border border-[var(--line)] bg-white px-5 py-3.5 text-sm outline-none focus:border-[var(--rose)]" /><div className="flex gap-2 overflow-x-auto">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full px-4 py-3 text-sm font-semibold ${category === item ? "bg-[var(--foreground)] text-white" : "bg-white text-[var(--foreground)]"}`}>{item}</button>)}</div></div><p className="mt-10 text-sm text-[var(--ink-soft)]">{filtered.length} recette{filtered.length > 1 ? "s" : ""}</p><div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{filtered.map((recipe) => <RecipeCard key={recipe.slug} recipe={recipe} />)}</div>{filtered.length === 0 && <div className="py-24 text-center"><p className="display text-3xl">Aucune recette trouvée.</p><p className="mt-2 text-[var(--ink-soft)]">Essaie un autre mot ou une autre catégorie.</p></div>}</main></>;
}
