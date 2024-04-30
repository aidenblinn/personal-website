import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aiden Blinn",
  description: "Personal portfolio website for Aiden Blinn.",
  metadataBase: new URL("https://aidenblinn.com"),
  openGraph: {
    title: "Aiden Blinn | Software Engineer",
    images: ["/img/desktop/bliss-background.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          "overflow-hidden overscroll-none select-none cursor-xp-default h-dvh"
        }
      >
        {children}
      </body>
    </html>
  );
}
