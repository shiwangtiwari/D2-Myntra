import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Myntra D2 — Wishlist Behavior Discovery Engine",
  description: "AI-powered analysis of why Myntra users save but don't buy",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='4' fill='%23FF3F6C'/><text x='6' y='24' font-size='20' font-weight='bold' fill='white'>M</text></svg>"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
