import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SiteShell } from "@/components/shared/site-shell";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammedemin.example.com"),
  title: {
    default: "Muhammed Emin Türkoğlu — Hemşire & Yazılım Geliştirici",
    template: "%s | Muhammed Emin Türkoğlu",
  },
  description:
    "Bursa Şehir Hastanesi'nde hemşire, aynı zamanda Next.js ve dijital pazarlama tutkunu Muhammed Emin Türkoğlu'nun premium kişisel marka platformu.",
  keywords: ["Muhammed Emin Türkoğlu", "Hemşire", "Yazılım", "Next.js", "Dijital Pazarlama", "Bursa"],
  authors: [{ name: "Muhammed Emin Türkoğlu" }],
  openGraph: {
    title: "Muhammed Emin Türkoğlu",
    description: "Sağlığa şefkat, kodlara hassasiyet.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
