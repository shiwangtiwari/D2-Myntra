import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Myntra Wishlist Behavior — D2 Discovery Engine",
  description: "AI-powered analysis of why users save but don't buy on Myntra",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
