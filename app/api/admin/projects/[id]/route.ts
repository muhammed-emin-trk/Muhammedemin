import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { syncContentToGitHub } from "@/lib/github-sync";

function guard() {
  if (!isAdmin()) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  return null;
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (guard()) return guard()!;
  const b = await req.json();
  const content = JSON.stringify(b.content || []);
  const tags = Array.isArray(b.tags) ? b.tags.join(",") : String(b.tags || "");
  await query(
    `UPDATE projects SET slug=$1,title=$2,category=$3,year=$4,role=$5,cover=$6,description=$7,content=$8,tags=$9,featured=$10,sort_order=$11 WHERE id=$12`,
    [b.slug, b.title, b.category, b.year || null, b.role, b.cover, b.description, content, tags, !!b.featured, b.sort_order || 0, Number(params.id)]
  );
  revalidatePath("/projeler");
  revalidatePath(`/projeler/${b.slug}`);
  revalidatePath("/");
  const github = await syncContentToGitHub("projects");
  return NextResponse.json({ ok: true, github });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (guard()) return guard()!;
  await query("DELETE FROM projects WHERE id=$1", [Number(params.id)]);
  revalidatePath("/projeler");
  revalidatePath("/");
  const github = await syncContentToGitHub("projects");
  return NextResponse.json({ ok: true, github });
}
