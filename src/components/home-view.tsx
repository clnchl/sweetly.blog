import Link from "next/link";
import type { Recipe } from "@/lib/recipe";
import { RecipeCard } from "@/components/recipe-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function HomeView({ recipes }: { recipes: Recipe[] }) {
    const featuredRecipe = recipes.find((recipe) => recipe.slug === "moelleux-au-chocolat") ?? recipes[0];

    return <>
        <SiteHeader />
        <main>
            <section className="site-shell grid min-h-[600px] overflow-x-clip items-center gap-10 py-14 md:grid-cols-[1fr_.9fr] md:py-20">
                <div className="fade-up"><p className="eyebrow">Carnet gourmand · recettes maison</p><h1 className="display mt-5 max-w-xl text-6xl font-semibold leading-[.98] tracking-[-.04em] md:text-8xl">Bienvenue sur <i className="font-normal text-[var(--rose)]">Sweetly</i></h1><p className="mt-7 max-w-lg text-lg leading-8 text-[var(--ink-soft)]">Des recettes simples, gourmandes et faites avec amour</p><Link href="#recettes" className="mt-8 inline-flex rounded-full bg-[var(--rose)] px-6 py-3.5 text-sm font-bold !text-white transition hover:bg-[var(--rose-dark)]">Découvrir mes recettes <span className="ml-3">↓</span></Link></div>
                <div className="relative mx-auto w-fit max-w-full"><div className="absolute -inset-4 rotate-3 rounded-[40px] bg-[var(--cream)]" />{featuredRecipe && <><img src={featuredRecipe.image} alt={featuredRecipe.title} className="relative block h-auto max-h-[520px] w-auto max-w-full rounded-[34px] soft-shadow" /><div className="absolute -bottom-5 -left-5 rounded-2xl bg-white p-4 shadow-lg"><p className="eyebrow">La recette du moment</p><p className="display mt-1 text-xl font-semibold">{featuredRecipe.title}</p></div></>}</div>
            </section>
            <section className="border-y border-[var(--line)] bg-[#ffe3e3] py-16"><div className="site-shell grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-center"><p className="eyebrow">Un peu de moi</p><p className="display max-w-3xl text-3xl leading-tight md:text-5xl">Sweetly partage des recettes simples et gourmandes de pâtisserie maison, pour débutants et passionnés.</p></div></section>
            <section id="recettes" className="site-shell py-20"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><h2 className="display text-5xl font-semibold">Recettes ajoutées récemment</h2><Link href="/recettes" className="text-sm font-bold text-[var(--rose-dark)]">Voir toutes les recettes ↗</Link></div><div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{recipes.slice(0, 6).map((recipe) => <RecipeCard key={recipe.slug} recipe={recipe} />)}</div></section>
        </main>
        <SiteFooter />
    </>;
}
