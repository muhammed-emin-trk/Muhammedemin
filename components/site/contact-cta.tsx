import Link from "next/link";
export function ContactCta() {
  return <section className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-r from-blue-600 to-emerald-500 p-10 text-white"><h2 className="text-3xl font-semibold">Birlikte Değer Üretelim</h2><Link className="mt-4 inline-block rounded-xl bg-white px-4 py-2 text-slate-900" href="/iletisim">İletişime Geç</Link></section>;
}
