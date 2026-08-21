import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lluna — Intelligent customer workspace",
  description: "One intelligent workspace for every customer conversation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
