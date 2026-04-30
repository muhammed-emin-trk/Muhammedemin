import { NextRequest, NextResponse } from "next/server";

function getQueryFn() {
  try {
    const req = eval("require") as NodeJS.Require;
    const dbModule = req(`${process.cwd()}/lib/db`) as { query?: (text: string, params?: any[]) => Promise<unknown> };
    return dbModule.query;
  } catch {
    return undefined;
  }
}

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

    const query = getQueryFn();
    if (!query) {
      return NextResponse.json({ error: "Veritabanı bağlantısı hazır değil." }, { status: 503 });
    }

    await query("INSERT INTO messages (name,email,subject,message) VALUES ($1,$2,$3,$4)", [
      name,
      email,
      subject || null,
      message,
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Mesaj iletilemedi." }, { status: 500 });
  }
}
