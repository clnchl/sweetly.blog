import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { cookieName, createSessionCookie } from "@/lib/admin-auth";

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });

export async function POST(request: Request) {
    const parsed = loginSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Identifiants invalides." }, { status: 400 });

    const emailMatches = parsed.data.email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase();
    const passwordHash = process.env.ADMIN_PASSWORD_HASH_B64 ? Buffer.from(process.env.ADMIN_PASSWORD_HASH_B64, "base64").toString("utf8") : "";
    const passwordMatches = passwordHash ? await compare(parsed.data.password, passwordHash) : false;
    if (!emailMatches || !passwordMatches) return NextResponse.json({ error: "Email ou mot de passe incorrect." }, { status: 401 });

    const response = NextResponse.json({ ok: true });
    response.cookies.set(cookieName, createSessionCookie(), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 8, path: "/" });
    return response;
}
