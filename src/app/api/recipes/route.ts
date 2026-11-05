import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { rejectUnlessAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { recipeChildren, recipeDetails, recipeInput, recipeWriteData, slugify, toAdminRecipe } from "@/lib/recipe";

export async function POST(request: Request) {
  const rejection = await rejectUnlessAdmin(request);
  if (rejection) return rejection;

  const parsed = recipeInput.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Les informations de la recette sont incomplètes." }, { status: 400 });
  const data = parsed.data;

  const slug = slugify(data.title);
  if (!slug) return NextResponse.json({ error: "Le nom de la recette doit contenir des lettres ou des chiffres." }, { status: 400 });
  if (!await prisma.category.findUnique({ where: { id: data.categoryId }, select: { id: true } })) return NextResponse.json({ error: "Cette catégorie n'existe plus." }, { status: 400 });

  const children = recipeChildren(data);
  try {
    const recipe = await prisma.recipe.create({
      data: {
        ...recipeWriteData(data),
        slug,
        ingredients: { create: children.ingredients },
        utensils: { create: children.utensils },
        instructions: { create: children.instructions },
      },
      include: recipeDetails,
    });
    revalidatePath("/", "layout");
    return NextResponse.json(toAdminRecipe(recipe), { status: 201 });
  } catch (error) {
    if ((error as { code?: string }).code === "P2002") return NextResponse.json({ error: "Une recette porte déjà ce nom." }, { status: 409 });
    throw error;
  }
}
