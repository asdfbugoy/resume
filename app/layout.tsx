import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-titillium",
});

export const metadata: Metadata = {
  title: "Factorio",
  description:
    "Factorio is a game in which you build and maintain factories.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={titillium.variable}>
      <body>{children}</body>
    </html>
  );
}
