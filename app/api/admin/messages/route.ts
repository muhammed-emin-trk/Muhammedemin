import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { query } from "@/lib/db";

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  const rows = await query("SELECT * FROM messages ORDER BY created_at DESC");
  return NextResponse.json(rows);
}
