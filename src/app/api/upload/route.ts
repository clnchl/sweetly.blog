import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { rejectUnlessAdmin } from "@/lib/admin-auth";

// Délivre à l'administrateur connecté une autorisation d'envoi limitée aux images.
// Le navigateur envoie ensuite la photo directement au stockage.
export async function POST(request: Request) {
  const rejection = await rejectUnlessAdmin(request);
  if (rejection) return rejection;

  const body = await request.json().catch(() => null) as HandleUploadBody | null;
  if (body?.type !== "blob.generate-client-token") return NextResponse.json({ error: "Requête invalide." }, { status: 400 });

  try {
    const result = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
        maximumSizeInBytes: 10 * 1024 * 1024,
        addRandomSuffix: true,
      }),
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Autorisation d'envoi impossible", error);
    return NextResponse.json({ error: "Envoi de la photo impossible." }, { status: 500 });
  }
}
