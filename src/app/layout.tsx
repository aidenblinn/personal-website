import type { Metadata } from "next";
import "./globals.css";
import Desktop from "./page.tsx";

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
      <body className={"overflow-hidden overscroll-none select-none"}>
        {children}
      </body>
    </html>
  );
}
