import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

function guard() {
  if (!isAdmin()) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  return null;
}

export async function GET() {
  if (guard()) return guard()!;
  const rows = await query("SELECT * FROM pages ORDER BY sort_order ASC, id ASC");
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (guard()) return guard()!;
  const b = await req.json();
  const slug = String(b.slug || "").trim();
  if (!slug) return NextResponse.json({ error: "Slug gerekli" }, { status: 400 });
  const body = JSON.stringify(b.body || []);
  await query(
    `INSERT INTO pages (slug,title,subtitle,cover,category,tags,body,show_in_nav,published,sort_order)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
    [slug, b.title || "", b.subtitle || "", b.cover || "", b.category || "", JSON.stringify(b.tags || []), body, !!b.show_in_nav, b.published !== false, b.sort_order || 0]
  );
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
