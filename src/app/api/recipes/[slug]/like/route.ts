import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function POST(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try { const recipe = await prisma.recipe.update({ where: { slug }, data: { likes: { increment: 1 } }, select: { likes: true } }); revalidatePath(`/recettes/${slug}`); return NextResponse.json(recipe); }
  catch (error) { if ((error as { code?: string }).code === "P2025") return NextResponse.json({ error: "Recette introuvable." }, { status: 404 }); throw error; }
}
