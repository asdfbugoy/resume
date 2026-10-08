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

const description =
  "Front-End Lead / Senior Engineer — 18 years of shipping the web. " +
  "React, Next.js, TypeScript, Node, and a factory-grade love of production lines.";

export const metadata: Metadata = {
  metadataBase: new URL("https://asdfbugoy.github.io/resume"),
  title: "Francis Samande Declaro — Front-End Engineer",
  description,
  openGraph: {
    title: "Francis Samande Declaro — Front-End Engineer",
    description,
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${titillium.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
