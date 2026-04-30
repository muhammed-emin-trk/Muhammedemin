import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "met_admin";
const SECRET = process.env.SESSION_SECRET || "fallback-not-secret-please-set";

const encoder = new TextEncoder();

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

async function hmacSha256Hex(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function verify(token: string): Promise<boolean> {
  const i = token.lastIndexOf(".");
  if (i < 0) return false;

  const value = token.slice(0, i);
  const sig = token.slice(i + 1);
  const expected = await hmacSha256Hex(value, SECRET);

  return timingSafeEqualHex(sig, expected);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();

  const c = req.cookies.get(COOKIE_NAME)?.value;
  if (c && (await verify(c))) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
