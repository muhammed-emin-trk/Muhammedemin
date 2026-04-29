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
  const rows = await query("SELECT * FROM testimonials ORDER BY sort_order ASC, id ASC");
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (guard()) return guard()!;
  const b = await req.json();
  await query(
    "INSERT INTO testimonials (name,role,avatar,content,rating,sort_order) VALUES ($1,$2,$3,$4,$5,$6)",
    [b.name, b.role || "", b.avatar || "", b.content || "", b.rating || 5, b.sort_order || 0]
  );
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
