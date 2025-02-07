"use client";

import { Sidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { History, LogIn, LogOut, UserRoundCog } from "lucide-react"; // アイコンをインポート
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { useEffect } from "react";
interface user {
  name: string;
  email: string;
}

const fetcher = async (url: strign): promise<UserInfo> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("ユーザー情報の取得に失敗しました");
  return res.json();
};

export function AppSidebar() {
  const { data: session } = useSession();
  const router = useRouter();

  const { data: user, mutate } = useSWR("/api/user/profile", fetcher, {
    revalidateOnFocus: false, // フォーカス時の自動再検証を不要にする
  });

  useEffect(() => {
    const handleProfileUpdated = () => {
      mutate();
    };

    window.addEventListener("profileUpdated", handleProfileUpdated);
    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdated);
    };
  }, [mutate]);

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
                <Link
                  href="/settings/profile"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
                >
                  <UserRoundCog className="h-4 w-4" />
                  アカウント設定
                </Link>
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
                <p className="text-sm font-medium">
                  {user?.name || "読み込み中..."}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email || "読み込み中..."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
}
