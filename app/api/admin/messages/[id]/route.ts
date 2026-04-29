import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { query } from "@/lib/db";

function guard() {
  if (!isAdmin()) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  return null;
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (guard()) return guard()!;
  const b = await req.json();
  const id = Number(params.id);
  const updates: string[] = [];
  const vals: any[] = [];
  let i = 1;
  if (typeof b.is_read === "boolean") { updates.push(`is_read=$${i++}`); vals.push(b.is_read); }
  if (typeof b.is_starred === "boolean") { updates.push(`is_starred=$${i++}`); vals.push(b.is_starred); }
  if (typeof b.reply === "string") {
    updates.push(`reply=$${i++}`); vals.push(b.reply);
    updates.push(`replied_at=NOW()`);
  }
  if (!updates.length) return NextResponse.json({ ok: true });
  vals.push(id);
  await query(`UPDATE messages SET ${updates.join(",")} WHERE id=$${i}`, vals);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (guard()) return guard()!;
  await query("DELETE FROM messages WHERE id=$1", [Number(params.id)]);
  return NextResponse.json({ ok: true });
}
