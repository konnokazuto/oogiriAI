"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { update } from "@/auth";

type Inputs = {
  name: string;
};

export default function Profile() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await fetch("/api/settings/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      // セッションの更新を強制
      window.dispatchEvent(new Event("profileUpdated"));
      window.location.reload();
    }
    const result = await res.json();
    console.log(result);

    if (!res) {
      const error = await res.json();
      console.log(error);
      return;
    }

    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-yellow-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700"
            >
              ユーザー名
            </label>
            <input
              type="text"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              {...register("name")}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full mt-4 bg-pink-500 text-white rounded-md py-2 hover:bg-pink-600 transition-colors"
            >
              登録
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
