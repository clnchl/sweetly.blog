import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { rejectUnlessAdmin } from "@/lib/admin-auth";
import { categoryInput } from "@/lib/category";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/recipe";

export async function POST(request: Request) {
  const rejection = await rejectUnlessAdmin(request);
  if (rejection) return rejection;

  const parsed = categoryInput.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Ce nom de catégorie n'est pas valide." }, { status: 400 });

  try {
    const category = await prisma.category.create({ data: { name: parsed.data.name, slug: slugify(parsed.data.name) } });
    revalidatePath("/", "layout");
    return NextResponse.json({ id: category.id, name: category.name, recipeCount: 0 }, { status: 201 });
  } catch (error) {
    if ((error as { code?: string }).code === "P2002") return NextResponse.json({ error: "Cette catégorie existe déjà." }, { status: 409 });
    throw error;
  }
}
