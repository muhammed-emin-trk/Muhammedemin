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
  await query(
    "UPDATE testimonials SET name=$1,role=$2,avatar=$3,content=$4,rating=$5,sort_order=$6 WHERE id=$7",
    [b.name, b.role || "", b.avatar || "", b.content || "", b.rating || 5, b.sort_order || 0, Number(params.id)]
  );
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (guard()) return guard()!;
  await query("DELETE FROM testimonials WHERE id=$1", [Number(params.id)]);
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
