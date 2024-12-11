import type { Metadata } from "next";
import "./globals.css";
import { mPlusRounded1c } from "@/app/lib/fonts";
import { NextAuthProvider } from "./components/NextAuthProvider";

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
