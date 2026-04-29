import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = String(body.name || "").trim().slice(0, 200);
    const email = String(body.email || "").trim().slice(0, 200);
    const subject = String(body.subject || "").trim().slice(0, 300);
    const message = String(body.message || "").trim().slice(0, 5000);

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Lütfen tüm alanları doldurun." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Geçerli bir e-posta girin." }, { status: 400 });
    }

    await query(
      "INSERT INTO messages (name,email,subject,message) VALUES ($1,$2,$3,$4)",
      [name, email, subject || null, message]
    );

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: "Mesaj iletilemedi." }, { status: 500 });
  }
}
