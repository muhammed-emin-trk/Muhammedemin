import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

function guard() {
  if (!isAdmin()) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  return null;
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (guard()) return guard()!;
  const b = await req.json();
  const body = JSON.stringify(b.body || []);
  const tags = Array.isArray(b.tags) ? b.tags.join(",") : String(b.tags || "");
  await query(
    `UPDATE posts SET slug=$1,title=$2,excerpt=$3,cover=$4,date=$5,reading_minutes=$6,body=$7,tags=$8,published=$9,sort_order=$10,updated_at=NOW() WHERE id=$11`,
    [b.slug, b.title, b.excerpt, b.cover, b.date, b.reading_minutes || 5, body, tags, b.published !== false, b.sort_order || 0, Number(params.id)]
  );
  revalidatePath("/blog");
  revalidatePath(`/blog/${b.slug}`);
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (guard()) return guard()!;
  await query("DELETE FROM posts WHERE id=$1", [Number(params.id)]);
  revalidatePath("/blog");
  return NextResponse.json({ ok: true });
}
