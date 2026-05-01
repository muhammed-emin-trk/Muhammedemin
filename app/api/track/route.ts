import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ensureTables } from "@/lib/migrate";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    await ensureTables();
    const { path } = await req.json();
    if (!path || typeof path !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const referrer = req.headers.get("referer") || "";
    const ua = req.headers.get("user-agent") || "";

    await query(
      `INSERT INTO page_views (path, referrer, ua) VALUES ($1, $2, $3)`,
      [path.slice(0, 500), referrer.slice(0, 500), ua.slice(0, 500)]
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
