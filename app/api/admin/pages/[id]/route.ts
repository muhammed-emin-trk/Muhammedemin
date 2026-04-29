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
  await query(
    `UPDATE pages SET slug=$1,title=$2,subtitle=$3,cover=$4,body=$5,show_in_nav=$6,published=$7,sort_order=$8,updated_at=NOW() WHERE id=$9`,
    [b.slug, b.title, b.subtitle, b.cover, body, !!b.show_in_nav, b.published !== false, b.sort_order || 0, Number(params.id)]
  );
  revalidatePath("/", "layout");
  revalidatePath(`/sayfa/${b.slug}`);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (guard()) return guard()!;
  await query("DELETE FROM pages WHERE id=$1", [Number(params.id)]);
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
