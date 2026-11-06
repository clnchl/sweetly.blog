import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { rejectUnlessAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

const featuredInput = z.object({ slug: z.string().min(1).nullable() });

export async function POST(request: Request) {
  const rejection = await rejectUnlessAdmin(request);
  if (rejection) return rejection;

  const parsed = featuredInput.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  const { slug } = parsed.data;

  const updated = await prisma.$transaction(async (tx) => {
    await tx.recipe.updateMany({ where: { featured: true }, data: { featured: false } });
    if (!slug) return true;
    const result = await tx.recipe.updateMany({ where: { slug, published: true }, data: { featured: true } });
    if (result.count === 0) throw new Error("not-published");
    return true;
  }).catch((error: Error) => {
    if (error.message === "not-published") return false;
    throw error;
  });

  if (!updated) return NextResponse.json({ error: "Cette recette n'est pas publiée." }, { status: 404 });
  revalidatePath("/", "layout");
  return NextResponse.json({ slug });
}
