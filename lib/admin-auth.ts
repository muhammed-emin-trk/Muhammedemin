import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "met_admin";
const SECRET = process.env.SESSION_SECRET || "fallback-not-secret-please-set";
const MAX_AGE = 60 * 60 * 24 * 30;

function sign(value: string) {
  const h = crypto.createHmac("sha256", SECRET).update(value).digest("hex");
  return `${value}.${h}`;
}

function verify(token: string): string | null {
  const i = token.lastIndexOf(".");
  if (i < 0) return null;
  const value = token.slice(0, i);
  const sig = token.slice(i + 1);
  const expected = crypto.createHmac("sha256", SECRET).update(value).digest("hex");
  try {
    if (sig.length !== expected.length) return null;
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
    return value;
  } catch {
    return null;
  }
}

export function checkPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  if (input.length !== expected.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(input), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function setAdminCookie() {
  const token = sign(`admin:${Date.now()}`);
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export function clearAdminCookie() {
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export function isAdmin(): boolean {
  const c = cookies().get(COOKIE_NAME);
  if (!c?.value) return false;
  const v = verify(c.value);
  return v !== null && v.startsWith("admin:");
}
