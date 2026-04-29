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
  const rows = await query("SELECT * FROM posts ORDER BY sort_order ASC, id ASC");
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (guard()) return guard()!;
  const b = await req.json();
  const slug = String(b.slug || "").trim();
  if (!slug) return NextResponse.json({ error: "Slug gerekli" }, { status: 400 });
  const body = JSON.stringify(b.body || []);
  const tags = Array.isArray(b.tags) ? b.tags.join(",") : String(b.tags || "");
  await query(
    `INSERT INTO posts (slug,title,excerpt,cover,date,reading_minutes,body,tags,published,sort_order)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
    [slug, b.title || "", b.excerpt || "", b.cover || "", b.date || new Date(), b.reading_minutes || 5, body, tags, b.published !== false, b.sort_order || 0]
  );
  revalidatePath("/blog");
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
