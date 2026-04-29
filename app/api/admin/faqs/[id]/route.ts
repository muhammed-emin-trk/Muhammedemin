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
    "UPDATE faqs SET question=$1,answer=$2,sort_order=$3 WHERE id=$4",
    [b.question, b.answer || "", b.sort_order || 0, Number(params.id)]
  );
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (guard()) return guard()!;
  await query("DELETE FROM faqs WHERE id=$1", [Number(params.id)]);
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
