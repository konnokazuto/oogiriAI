import type { Metadata } from "next";
import "./globals.css";
import { mPlusRounded1c } from "@/app/lib/fonts";
import { NextAuthProvider } from "./components/NextAuthProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/AppSidebar";

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
      <body className="h-full w-full">
        <NextAuthProvider>
          <SidebarProvider>
            <div className="flex h-full w-full">
              <AppSidebar />
              <main className="flex-1 w-full bg-gradient-to-br from-pink-100 to-yellow-100">
                <SidebarTrigger />
                {children}
              </main>
            </div>
          </SidebarProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
