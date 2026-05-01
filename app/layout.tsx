import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.muhammedeminturk.com.tr"),
  title: {
    default: "Muhammed Emin Türkoğlu | Yazılım Geliştirici & Portfolyo",
    template: "%s | Muhammed Emin Türkoğlu",
  },
  description:
    "Muhammed Emin Türkoğlu'nun kişisel portfolyo sitesi: yazılım geliştirici olarak ürettiği projeler, teknik yetkinlikler ve iletişim bilgileri.",
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
  creator: "Muhammed Emin Türkoğlu",
  publisher: "Muhammed Emin Türkoğlu",
  alternates: { canonical: "/" },
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
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammed Emin Türkoğlu",
    url: "https://www.muhammedeminturk.com.tr",
    sameAs: [
      "https://www.instagram.com/emin.trkoglu?igsh=MTRnbWJ4MWM5dmdydw%3D%3D&utm_source=qr",
    ],
    jobTitle: "Hemşire & Yazılım Geliştirici",
  };

  return (
    <html lang="tr" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
