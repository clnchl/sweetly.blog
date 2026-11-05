import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { LikeButton } from "@/components/like-button";
import { prisma } from "@/lib/prisma";
import { toRecipe } from "@/lib/recipe";

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const record = await prisma.recipe.findUnique({ where: { slug }, include: { category: true, ingredients: { orderBy: { order: "asc" } }, utensils: { orderBy: { order: "asc" } }, instructions: { orderBy: { step: "asc" } } } });
    if (!record) notFound();
    const recipe = toRecipe(record);

    return <>
        <SiteHeader />
        <main className="site-shell py-12 md:py-20">
            <Link href="/recettes" className="text-sm font-bold text-[var(--rose-dark)]">← Retour aux recettes</Link>
            <div className="mt-10 grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-start">
                <img src={recipe.image} alt={recipe.title} className="h-[420px] w-full rounded-[30px] object-cover soft-shadow md:h-[600px]" />
                <div>
                    <p className="eyebrow">{recipe.category}</p>
                    <h1 className="display mt-4 text-6xl font-semibold leading-none md:text-8xl">{recipe.title}</h1>
                    <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--ink-soft)]">{recipe.description}</p><LikeButton slug={recipe.slug} initialLikes={recipe.likes} />
                    <div className="my-8 grid grid-cols-3 gap-3 border-y border-[var(--line)] py-5 text-sm">
                        <div><p className="text-[var(--ink-soft)]">Préparation</p><strong>{recipe.prep}</strong></div>
                        <div><p className="text-[var(--ink-soft)]">Cuisson</p><strong>{recipe.bake}</strong></div>
                        <div><p className="text-[var(--ink-soft)]">Quantité</p><strong>{recipe.servings}</strong></div>
                    </div>
                    <div className="mt-14 grid gap-10 md:grid-cols-2">
                        <section><h2 className="display text-3xl font-semibold">Ingrédients</h2><ul className="mt-5 space-y-3 text-[var(--ink-soft)]">{recipe.ingredients.map((item) => <li key={item} className="border-b border-[var(--line)] pb-3">{item}</li>)}</ul></section>
                        <section><h2 className="display text-3xl font-semibold">Ustensiles</h2><ul className="mt-5 space-y-3 text-[var(--ink-soft)]">{recipe.utensils.map((item) => <li key={item} className="border-b border-[var(--line)] pb-3">{item}</li>)}</ul></section>
                    </div>
                </div>
            </div>
            <section className="mt-20 max-w-3xl"><p className="eyebrow">Pas à pas</p><h2 className="display mt-3 text-5xl font-semibold">La préparation</h2><ol className="mt-8 space-y-6">{recipe.instructions.map((instruction, index) => <li key={instruction} className="flex gap-5 border-b border-[var(--line)] pb-6"><span className="display text-3xl text-[var(--rose)]">{String(index + 1).padStart(2, "0")}</span><p className="pt-1 leading-7 text-[var(--ink-soft)]">{instruction}</p></li>)}</ol></section>
        </main>
    </>;
}
