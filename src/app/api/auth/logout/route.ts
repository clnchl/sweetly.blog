import { NextResponse } from "next/server";
import { endSession, isSameOrigin } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Requête refusée." }, { status: 403 });
  const response = NextResponse.json({ ok: true });
  await endSession(response);
  return response;
}
