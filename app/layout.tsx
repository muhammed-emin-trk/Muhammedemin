import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SiteShell } from "@/components/shared/site-shell";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.muhammedeminturk.com.tr"),
  title: {
    default: "Muhammed Emin Türkoğlu — Hemşire & Yazılım Geliştirici",
    template: "%s | Muhammed Emin Türkoğlu",
  },
  description:
    "Bursa Şehir Hastanesi'nde hemşire, aynı zamanda yazılım ve dijital pazarlama tutkunu Muhammed Emin Türkoğlu'nun kişisel web sitesi.",
  keywords: [
    "Muhammed Emin",
    "Muhammed Emin Türkoğlu",
    "Mehmet Emin Türkoğlu",
    "muhammedeminturk.com.tr",
    "Hemşire",
    "Yazılım Geliştirici",
    "Next.js",
    "Bursa",
  ],
  authors: [{ name: "Muhammed Emin Türkoğlu", url: "https://www.muhammedeminturk.com.tr" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Muhammed Emin Türkoğlu",
    description: "Sağlığa şefkat, kodlara hassasiyet.",
    locale: "tr_TR",
    type: "website",
    url: "https://www.muhammedeminturk.com.tr",
    siteName: "Muhammed Emin Türkoğlu",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammed Emin Türkoğlu",
    description: "Sağlığa şefkat, kodlara hassasiyet.",
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
