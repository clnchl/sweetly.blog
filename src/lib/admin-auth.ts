import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "sweetly_admin_session";

function signature(value: string) {
    return createHmac("sha256", process.env.AUTH_SECRET ?? "").update(value).digest("hex");
}

export function createSessionCookie() {
    const value = `admin:${Date.now()}`;
    return `${value}.${signature(value)}`;
}

export function isValidSession(value: string | undefined) {
    if (!value) return false;
    const separator = value.lastIndexOf(".");
    if (separator < 1) return false;
    const payload = value.slice(0, separator);
    const provided = value.slice(separator + 1);
    const expected = signature(payload);
    if (provided.length !== expected.length) return false;
    return timingSafeEqual(Buffer.from(provided), Buffer.from(expected)) && payload.startsWith("admin:");
}

export async function isAdminAuthenticated() {
    return isValidSession((await cookies()).get(cookieName)?.value);
}

export { cookieName };
