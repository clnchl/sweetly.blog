import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { minutes, toRecipe } from "@/lib/recipe";

const schema = z.object({ title: z.string().trim().min(1).max(160), category: z.string().trim().min(1).max(80), image: z.string().min(1), description: z.string().trim().max(2000), prep: z.string().trim().min(1), bake: z.string().trim(), servings: z.string().trim().min(1).max(120), ingredients: z.array(z.string().trim().min(1)).max(100), utensils: z.array(z.string().trim().min(1)).max(100), instructions: z.array(z.string().trim().min(1)).max(100) });
const details = { category: true, ingredients: { orderBy: { order: "asc" as const } }, utensils: { orderBy: { order: "asc" as const } }, instructions: { orderBy: { step: "asc" as const } } };
const categorySlug = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!await isAdminAuthenticated()) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Les informations de la recette sont incomplètes." }, { status: 400 });
  const { slug } = await params; const data = parsed.data;
  const category = await prisma.category.upsert({ where: { name: data.category }, update: {}, create: { name: data.category, slug: categorySlug(data.category) } });
  try {
    const recipe = await prisma.recipe.update({ where: { slug }, data: { title: data.title, description: data.description, image: data.image, servings: data.servings, preparationTime: minutes(data.prep), cookingTime: data.bake ? minutes(data.bake) : null, categoryId: category.id, ingredients: { deleteMany: {}, create: data.ingredients.map((name, order) => ({ name, quantity: "", order })) }, utensils: { deleteMany: {}, create: data.utensils.map((name, order) => ({ name, order })) }, instructions: { deleteMany: {}, create: data.instructions.map((content, index) => ({ content, step: index + 1 })) } }, include: details });
    revalidatePath("/", "layout"); return NextResponse.json(toRecipe(recipe));
  } catch (error) { if ((error as { code?: string }).code === "P2025") return NextResponse.json({ error: "Recette introuvable." }, { status: 404 }); throw error; }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!await isAdminAuthenticated()) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  const { slug } = await params;
  try { await prisma.recipe.delete({ where: { slug } }); revalidatePath("/", "layout"); return new NextResponse(null, { status: 204 }); }
  catch (error) { if ((error as { code?: string }).code === "P2025") return NextResponse.json({ error: "Recette introuvable." }, { status: 404 }); throw error; }
}
