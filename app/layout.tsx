import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { SiteShell } from "@/components/shared/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammed Emin Türkoğlu | Premium Kişisel Marka",
  description: "Hemşirelik, yazılım ve dijital strateji odağında premium kişisel marka platformu.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
