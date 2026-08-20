import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VAS — Vision for Advanced Sustainability",
  description: "VAS builds a portable, foldable, solar-assisted emergency charger for electric vehicles — reliable backup power when you need it most, drawn straight from the sun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-foreground bg-background">{children}</body>
    </html>
  );
}
