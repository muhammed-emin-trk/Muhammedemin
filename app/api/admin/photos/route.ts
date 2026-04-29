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
  const rows = await query("SELECT * FROM personal_photos ORDER BY sort_order ASC, id ASC");
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (guard()) return guard()!;
  const b = await req.json();
  if (!b.src) return NextResponse.json({ error: "Görsel gerekli" }, { status: 400 });
  await query("INSERT INTO personal_photos (src,alt,sort_order) VALUES ($1,$2,$3)", [b.src, b.alt || "", b.sort_order || 0]);
  revalidatePath("/hakkimda");
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
