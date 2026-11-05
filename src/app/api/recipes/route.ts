import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { minutes, toRecipe } from "@/lib/recipe";

const recipeSchema = z.object({
  title: z.string().trim().min(1).max(160), slug: z.string().trim().min(1).max(180),
  category: z.string().trim().min(1).max(80), image: z.string().min(1), description: z.string().trim().max(2000),
  prep: z.string().trim().min(1), bake: z.string().trim(), servings: z.string().trim().min(1).max(120),
  ingredients: z.array(z.string().trim().min(1)).max(100), utensils: z.array(z.string().trim().min(1)).max(100), instructions: z.array(z.string().trim().min(1)).max(100),
});

const details = { category: true, ingredients: { orderBy: { order: "asc" as const } }, utensils: { orderBy: { order: "asc" as const } }, instructions: { orderBy: { step: "asc" as const } } };

export async function GET() {
  const recipes = await prisma.recipe.findMany({ include: details, orderBy: { createdAt: "desc" } });
  return NextResponse.json(recipes.map(toRecipe));
}

export async function POST(request: Request) {
  if (!await isAdminAuthenticated()) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  const parsed = recipeSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Les informations de la recette sont incomplètes." }, { status: 400 });
  const data = parsed.data;
  try {
    const category = await prisma.category.upsert({ where: { name: data.category }, update: {}, create: { name: data.category, slug: data.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") } });
    const recipe = await prisma.recipe.create({ data: { title: data.title, slug: data.slug, description: data.description, image: data.image, servings: data.servings, preparationTime: minutes(data.prep), cookingTime: data.bake ? minutes(data.bake) : null, categoryId: category.id, ingredients: { create: data.ingredients.map((name, order) => ({ name, quantity: "", order })) }, utensils: { create: data.utensils.map((name, order) => ({ name, order })) }, instructions: { create: data.instructions.map((content, index) => ({ content, step: index + 1 })) } }, include: details });
    revalidatePath("/", "layout");
    return NextResponse.json(toRecipe(recipe), { status: 201 });
  } catch (error) {
    if ((error as { code?: string }).code === "P2002") return NextResponse.json({ error: "Une recette utilise déjà ce nom." }, { status: 409 });
    throw error;
  }
}
