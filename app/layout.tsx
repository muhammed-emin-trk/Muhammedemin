import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: "Muhammed Emin Türkoğlu | Hemşire & Yazılım Geliştirici",
  description:
    "Muhammed Emin Türkoğlu'nun hem sağlık hem teknoloji alanındaki profesyonel yolculuğunu tanıtan modern kişisel portfolyo sitesi.",
  keywords: [
    "Muhammed Emin Türkoğlu",
    "Hemşire",
    "Web Geliştirici",
    "Next.js Portfolio",
    "Dijital Pazarlama",
  ],
  openGraph: {
    title: "Muhammed Emin Türkoğlu | Portfolyo",
    description:
      "Hemşirelik deneyimi ile yazılım ve dijital pazarlama tutkusunu birleştiren profesyonel portfolyo.",
    type: "website",
    locale: "tr_TR",
    url: "https://example.com",
    siteName: "Muhammed Emin Türkoğlu Portfolyo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammed Emin Türkoğlu | Portfolyo",
    description:
      "Hemşirelik, yazılım ve dijital pazarlamayı bir araya getiren kişisel tanıtım sitesi.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
