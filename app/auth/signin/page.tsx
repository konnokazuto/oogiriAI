"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (isSignUp) {
      // 新規登録処理
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error);
        }

        // 登録成功後、自動的にログイン
        signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        router.push("/");
      } catch (error) {
        setError(error.message);
      }
    } else {
      // ログイン処理
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      if (result?.error === "CredentialsSignin") {
        // 認証エラーの処理
        setError("メールアドレスまたはパスワードが正しくありません");
        return;
      }

      if (result?.ok) {
        router.push("/");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-yellow-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? "アカウントを作成" : "ログイン"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                ユーザー名
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                required={isSignUp}
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              メールアドレス
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              パスワード
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-pink-500 text-white rounded-md py-2 hover:bg-pink-600 transition-colors"
          >
            {isSignUp ? "登録" : "ログイン"}
          </button>

          <div className="text-center text-sm text-gray-500">または</div>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full bg-white border border-gray-300 text-gray-700 rounded-md py-2 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <img src="/googleIcon.svg" alt="Google" className="w-5 h-5" />
            Googleで{isSignUp ? "登録" : "ログイン"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          {isSignUp ? (
            <p>
              すでにアカウントをお持ちですか？{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-pink-500 hover:underline"
              >
                ログイン
              </button>
            </p>
          ) : (
            <p>
              アカウントをお持ちでない場合は{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-pink-500 hover:underline"
              >
                新規登録
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
