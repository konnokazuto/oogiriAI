"use client";

import { Sidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { History, LogIn, LogOut } from "lucide-react"; // アイコンをインポート
import { useRouter } from "next/navigation";

export function AppSidebar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Sidebar side="right" className="border-r bg-white">
      <div className="flex h-full flex-col gap-4 p-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">メニュー</h2>
          <div className="space-y-1">
            {!session ? (
              <button
                type="button"
                onClick={() => router.push("/auth/signin")}
                className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
              >
                <LogIn className="h-4 w-4" />
                ログイン
              </button>
            ) : (
              <>
                <Link
                  href="/history"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
                >
                  <History className="h-4 w-4" />
                  解答履歴
                </Link>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4" />
                  ログアウト
                </button>
              </>
            )}
          </div>
        </div>

        {session?.user && (
          <div className="mt-auto px-3 py-2">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2">
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full"
                />
              )}
              <div>
                <p className="text-sm font-medium">{session.user.name}</p>
                <p className="text-xs text-gray-500">{session.user.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
}
