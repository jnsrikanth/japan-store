import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const notoSans = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto-sans" });
const notoSerif = Noto_Serif_JP({ subsets: ["latin"], variable: "--font-noto-serif" });

export const metadata: Metadata = {
  title: "Nippon Finds — 日本の良いもの",
  description: "Curated Japanese gadgets, toys, snacks, and gifts. Modern kawaii meets timeless Japanese craft.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body className="antialiased bg-white text-gray-900">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

