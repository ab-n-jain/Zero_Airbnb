import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kyoto weekend planner",
  description:
    "Chat prototype: one request returns one stay, one experience and one food spot.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-paper font-sans text-[15px] leading-[1.45] text-ink">
        {children}
      </body>
    </html>
  );
}
