import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sweetly | Recettes maison",
  description: "Les recettes maison de Sweetly : gâteaux, desserts, boissons et créations gourmandes.",
  icons: { icon: "/logo_sweetly.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${bodyFont.variable} ${displayFont.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
