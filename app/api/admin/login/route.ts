import { NextRequest, NextResponse } from "next/server";
import { checkPassword, setAdminCookie } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  if (!checkPassword(String(password || ""))) {
    return NextResponse.json({ error: "Şifre hatalı" }, { status: 401 });
  }
  setAdminCookie();
  return NextResponse.json({ ok: true });
}
