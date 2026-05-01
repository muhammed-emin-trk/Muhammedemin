import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { syncContentToGitHub } from "@/lib/github-sync";

function guard() {
  if (!isAdmin()) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  return null;
}

export async function GET() {
  if (guard()) return guard()!;
  const rows = await query("SELECT * FROM projects ORDER BY sort_order ASC, id ASC");
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (guard()) return guard()!;
  const b = await req.json();
  const slug = String(b.slug || "").trim();
  if (!slug) return NextResponse.json({ error: "Slug gerekli" }, { status: 400 });

  const content = JSON.stringify(b.content || []);
  const tags = Array.isArray(b.tags) ? b.tags.join(",") : String(b.tags || "");
  await query(
    `INSERT INTO projects (slug,title,category,year,role,cover,description,content,tags,featured,sort_order)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
    [slug, b.title || "", b.category || "", b.year || null, b.role || "", b.cover || "", b.description || "", content, tags, !!b.featured, b.sort_order || 0]
  );
  revalidatePath("/projeler");
  revalidatePath("/");
  const github = await syncContentToGitHub("projects");
  return NextResponse.json({ ok: true, github });
}
