import type { Metadata } from "next";
import "./globals.css";
import { NextAuthProvider } from "./components/NextAuthProvider";
import { mPlusRounded1c } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "大喜利AI",
  description: "AIが大喜利を評価するアプリケーション",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${mPlusRounded1c.variable} font-sans`}>
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
