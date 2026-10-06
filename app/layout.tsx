import type { Metadata } from "next";
import { Titillium_Web, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-titillium",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jb",
});

export const metadata: Metadata = {
  title: "Francis Samande Declaro — Front-End Engineer",
  description:
    "Front-End Lead / Senior Engineer — 18+ years shipping web products. " +
    "React, Next.js, TypeScript, Node, and a factory-grade love of production lines.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${titillium.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
