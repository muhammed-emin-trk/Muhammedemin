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
  const rows = await query("SELECT * FROM site_settings WHERE id=1");
  return NextResponse.json(rows[0] || {});
}

export async function PUT(req: NextRequest) {
  if (guard()) return guard()!;
  const b = await req.json();
  await query(
    `UPDATE site_settings SET hero_badge=$1,hero_title=$2,hero_subtitle=$3,hero_description=$4,
     email=$5,phone=$6,whatsapp=$7,location=$8,github=$9,linkedin=$10,instagram=$11,updated_at=NOW() WHERE id=1`,
    [b.hero_badge||"",b.hero_title||"",b.hero_subtitle||"",b.hero_description||"",
     b.email||"",b.phone||"",b.whatsapp||"",b.location||"",b.github||"",b.linkedin||"",b.instagram||""]
  );
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
