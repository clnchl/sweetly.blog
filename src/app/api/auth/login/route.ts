import { NextResponse } from "next/server";
import { z } from "zod";
import { clearLoginFailures, isLoginBlocked, isSameOrigin, recordLoginFailure, startSession, verifyCredentials } from "@/lib/admin-auth";

const loginSchema = z.object({ email: z.string().email().max(200), password: z.string().min(1).max(200) });

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Requête refusée." }, { status: 403 });
  const parsed = loginSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Email ou mot de passe incorrect." }, { status: 400 });

  if (await isLoginBlocked(request)) return NextResponse.json({ error: "Trop de tentatives. Réessaie dans 15 minutes." }, { status: 429 });

  if (!await verifyCredentials(parsed.data.email, parsed.data.password)) {
    await recordLoginFailure(request);
    return NextResponse.json({ error: "Email ou mot de passe incorrect." }, { status: 401 });
  }

  await clearLoginFailures(request);
  const response = NextResponse.json({ ok: true });
  await startSession(response);
  return response;
}
