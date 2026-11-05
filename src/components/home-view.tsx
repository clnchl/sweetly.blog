"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Recipe } from "@/lib/recipe";
import { RecipeCard } from "@/components/recipe-card";
import { SiteHeader } from "@/components/site-header";

export function HomeView({ recipes, categories }: { recipes: Recipe[]; categories: string[] }) {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("Toutes");
    const featuredRecipe = recipes.find((recipe) => recipe.slug === "moelleux-au-chocolat") ?? recipes[0];
    const filtered = useMemo(() => recipes.filter((recipe) => {
        const text = `${recipe.title} ${recipe.category} ${recipe.description}`.toLowerCase();
        return (category === "Toutes" || recipe.category === category) && text.includes(query.toLowerCase());
    }), [category, query, recipes]);

    return <>
        <SiteHeader />
        <main>
            <section className="site-shell grid min-h-[600px] items-center gap-10 py-14 md:grid-cols-[1fr_.9fr] md:py-20">
                <div className="fade-up"><p className="eyebrow">Carnet gourmand · recettes maison</p><h1 className="display mt-5 max-w-xl text-6xl font-semibold leading-[.98] tracking-[-.04em] md:text-8xl">Bienvenue sur <i className="font-normal text-[var(--rose)]">Sweetly</i></h1><p className="mt-7 max-w-lg text-lg leading-8 text-[var(--ink-soft)]">Des recettes simples, gourmandes et faites avec amour</p><Link href="#recettes" className="mt-8 inline-flex rounded-full bg-[var(--rose)] px-6 py-3.5 text-sm font-bold !text-white transition hover:bg-[var(--rose-dark)]">Découvrir mes recettes <span className="ml-3">↓</span></Link></div>
                <div className="relative mx-auto w-full max-w-[520px]"><div className="absolute -inset-4 rotate-3 rounded-[40px] bg-[var(--cream)]" />{featuredRecipe && <><img src={featuredRecipe.image} alt={featuredRecipe.title} className="relative h-[470px] w-full rounded-[34px] object-cover soft-shadow" /><div className="absolute -bottom-5 -left-5 rounded-2xl bg-white p-4 shadow-lg"><p className="eyebrow">La recette du moment</p><p className="display mt-1 text-xl font-semibold">{featuredRecipe.title}</p></div></>}</div>
            </section>
            <section className="border-y border-[var(--line)] bg-[#fbf2e8] py-16"><div className="site-shell grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-center"><p className="eyebrow">Un peu de moi</p><p className="display max-w-3xl text-3xl leading-tight md:text-5xl">Sweetly partage des recettes simples et gourmandes de pâtisserie maison, pour débutants et passionnés.</p></div></section>
            <section id="recettes" className="site-shell py-20"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">Les dernières fournées</p><h2 className="display mt-3 text-5xl font-semibold">À mettre au four</h2></div><Link href="/recettes" className="text-sm font-bold text-[var(--rose-dark)]">Voir toutes les recettes ↗</Link></div><div className="mt-10 flex flex-col gap-4 md:flex-row"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher une recette..." className="flex-1 rounded-full border border-[var(--line)] bg-white px-5 py-3.5 text-sm outline-none focus:border-[var(--rose)]" /><div className="flex gap-2 overflow-x-auto pb-1">{categories.slice(0, 4).map((item) => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full border px-4 py-3 text-sm font-semibold ${category === item ? "border-[var(--foreground)] bg-[var(--foreground)] text-white" : "border-[var(--line)] bg-white"}`}>{item}</button>)}</div></div><div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{filtered.slice(0, 6).map((recipe) => <RecipeCard key={recipe.slug} recipe={recipe} />)}</div></section>
        </main>
    </>;
}
