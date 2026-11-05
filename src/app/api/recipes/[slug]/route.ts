import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { rejectUnlessAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { isBlobUrl, recipeChildren, recipeDetails, recipeInput, recipeWriteData, toAdminRecipe } from "@/lib/recipe";

type Context = { params: Promise<{ slug: string }> };

const notFound = () => NextResponse.json({ error: "Recette introuvable." }, { status: 404 });

// La recette est déjà à jour : une photo orpheline ne doit pas faire échouer l'enregistrement.
async function deleteImage(image: string | null | undefined) {
  if (!image || !isBlobUrl(image)) return;
  try {
    await del(image);
  } catch (error) {
    console.error("Suppression de la photo impossible", error);
  }
}

export async function PUT(request: Request, { params }: Context) {
  const rejection = await rejectUnlessAdmin(request);
  if (rejection) return rejection;

  const parsed = recipeInput.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Les informations de la recette sont incomplètes." }, { status: 400 });
  const data = parsed.data;
  const { slug } = await params;

  const existing = await prisma.recipe.findUnique({ where: { slug }, select: { image: true } });
  if (!existing) return notFound();
  if (!await prisma.category.findUnique({ where: { id: data.categoryId }, select: { id: true } })) return NextResponse.json({ error: "Cette catégorie n'existe plus." }, { status: 400 });

  const children = recipeChildren(data);
  // Le slug ne change jamais : l'adresse publique de la recette reste valable.
  const recipe = await prisma.recipe.update({
    where: { slug },
    data: {
      ...recipeWriteData(data),
      ingredients: { deleteMany: {}, create: children.ingredients },
      utensils: { deleteMany: {}, create: children.utensils },
      instructions: { deleteMany: {}, create: children.instructions },
    },
    include: recipeDetails,
  });
  if (existing.image !== data.image) await deleteImage(existing.image);
  revalidatePath("/", "layout");
  return NextResponse.json(toAdminRecipe(recipe));
}

const publishInput = z.object({ published: z.boolean() });

export async function PATCH(request: Request, { params }: Context) {
  const rejection = await rejectUnlessAdmin(request);
  if (rejection) return rejection;

  const parsed = publishInput.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  const { slug } = await params;

  const result = await prisma.recipe.updateMany({ where: { slug }, data: { published: parsed.data.published } });
  if (result.count === 0) return notFound();
  revalidatePath("/", "layout");
  return NextResponse.json({ published: parsed.data.published });
}

export async function DELETE(request: Request, { params }: Context) {
  const rejection = await rejectUnlessAdmin(request);
  if (rejection) return rejection;

  const { slug } = await params;
  const existing = await prisma.recipe.findUnique({ where: { slug }, select: { image: true } });
  if (!existing) return notFound();
  await prisma.recipe.delete({ where: { slug } });
  await deleteImage(existing.image);
  revalidatePath("/", "layout");
  return new NextResponse(null, { status: 204 });
}
