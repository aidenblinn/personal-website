import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aiden Blinn | Software Engineer",
  description: "Personal portfolio website for Aiden Blinn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`overscroll-none ${inter.className}`}>{children}</body>
    </html>
  );
}
