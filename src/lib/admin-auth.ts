import { createHash, createHmac, randomBytes } from "node:crypto";
import { compare } from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const cookieName = "sweetly_admin_session";
const sessionDurationMs = 7 * 24 * 60 * 60 * 1000;
const maxFailures = 5;
const failureWindowMs = 15 * 60 * 1000;
// Hash bcrypt valide d'une valeur aléatoire : le temps de réponse reste le même quand l'email est faux.
const decoyHash = "$2b$12$vO2347bRK3Gxwb80mQ4fluWXPI5SkhH8TWjivaj/z8WXGOTaCsQOu";

function authSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) throw new Error("AUTH_SECRET manquant ou trop court.");
  return secret;
}

function hashToken(token: string) {
  return createHmac("sha256", authSecret()).update(token).digest("hex");
}

function cookieOptions(maxAge: number) {
  return { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", maxAge, path: "/" };
}

export async function verifyCredentials(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL;
  const encodedHash = process.env.ADMIN_PASSWORD_HASH_B64;
  if (!expectedEmail || !encodedHash) throw new Error("Identifiants administrateur non configurés.");
  const emailMatches = email.toLowerCase() === expectedEmail.toLowerCase();
  const passwordHash = emailMatches ? Buffer.from(encodedHash, "base64").toString("utf8") : decoyHash;
  const passwordMatches = await compare(password, passwordHash);
  return emailMatches && passwordMatches;
}

function attemptKey(request: Request) {
  const ip = request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  return createHash("sha256").update(ip).digest("hex");
}

export async function isLoginBlocked(request: Request) {
  const attempt = await prisma.loginAttempt.findUnique({ where: { key: attemptKey(request) } });
  if (!attempt) return false;
  return attempt.failures >= maxFailures && Date.now() - attempt.windowStart.getTime() < failureWindowMs;
}

export async function recordLoginFailure(request: Request) {
  const key = attemptKey(request);
  const attempt = await prisma.loginAttempt.findUnique({ where: { key } });
  const windowExpired = !attempt || Date.now() - attempt.windowStart.getTime() >= failureWindowMs;
  if (windowExpired) {
    await prisma.loginAttempt.upsert({ where: { key }, update: { failures: 1, windowStart: new Date() }, create: { key, failures: 1 } });
  } else {
    await prisma.loginAttempt.update({ where: { key }, data: { failures: { increment: 1 } } });
  }
}

export async function clearLoginFailures(request: Request) {
  await prisma.loginAttempt.deleteMany({ where: { key: attemptKey(request) } });
}

export async function startSession(response: NextResponse) {
  const token = randomBytes(32).toString("base64url");
  await prisma.adminSession.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  await prisma.adminSession.create({ data: { tokenHash: hashToken(token), expiresAt: new Date(Date.now() + sessionDurationMs) } });
  response.cookies.set(cookieName, token, cookieOptions(sessionDurationMs / 1000));
}

export async function endSession(response: NextResponse) {
  const token = (await cookies()).get(cookieName)?.value;
  if (token) await prisma.adminSession.deleteMany({ where: { tokenHash: hashToken(token) } });
  response.cookies.set(cookieName, "", cookieOptions(0));
}

export async function isAdminAuthenticated() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return false;
  const session = await prisma.adminSession.findUnique({ where: { tokenHash: hashToken(token) } });
  return !!session && session.expiresAt > new Date();
}

/** Pages d'administration : renvoie vers la connexion sans rien afficher. */
export async function requireAdminPage() {
  if (!await isAdminAuthenticated()) redirect("/admin");
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

/** Routes d'administration : renvoie une réponse d'erreur, ou null si la requête est autorisée. */
export async function rejectUnlessAdmin(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Requête refusée." }, { status: 403 });
  if (!await isAdminAuthenticated()) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  return null;
}

export { isSameOrigin };
