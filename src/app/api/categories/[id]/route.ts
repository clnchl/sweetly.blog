import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { rejectUnlessAdmin } from "@/lib/admin-auth";
import { categoryInput } from "@/lib/category";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/recipe";

type Context = { params: Promise<{ id: string }> };

function errorCode(error: unknown) {
  return (error as { code?: string }).code;
}

export async function PATCH(request: Request, { params }: Context) {
  const rejection = await rejectUnlessAdmin(request);
  if (rejection) return rejection;

  const parsed = categoryInput.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Ce nom de catégorie n'est pas valide." }, { status: 400 });
  const { id } = await params;

  try {
    await prisma.category.update({ where: { id }, data: { name: parsed.data.name, slug: slugify(parsed.data.name) } });
    revalidatePath("/", "layout");
    return NextResponse.json({ name: parsed.data.name });
  } catch (error) {
    if (errorCode(error) === "P2002") return NextResponse.json({ error: "Cette catégorie existe déjà." }, { status: 409 });
    if (errorCode(error) === "P2025") return NextResponse.json({ error: "Catégorie introuvable." }, { status: 404 });
    throw error;
  }
}

export async function DELETE(request: Request, { params }: Context) {
  const rejection = await rejectUnlessAdmin(request);
  if (rejection) return rejection;

  const { id } = await params;
  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/", "layout");
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (errorCode(error) === "P2003") return NextResponse.json({ error: "Cette catégorie contient encore des recettes." }, { status: 409 });
    if (errorCode(error) === "P2025") return NextResponse.json({ error: "Catégorie introuvable." }, { status: 404 });
    throw error;
  }
}
