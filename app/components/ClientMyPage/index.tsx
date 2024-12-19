"use client";

import { fetchResponses } from "@/app/actions/responses";
import Pagination from "@/app/components/Pagination";
import { HomeIcon } from "@heroicons/react/24/solid";
import type { Session } from "next-auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ScoreBadge from "./ScoreBadge/index";

interface Response {
  id: string;
  prompt: string;
  response: string;
  evaluation: string;
  score: number;
  createdAt: string;
}

interface ClientMyPageProps {
  initialData: {
    responses: Response[];
    pagination: {
      total: number;
      totalPages: number;
      currentPage: number;
      limit: number;
    };
  };
  session: Session | null;
}

export default function ClientMyPage({
  initialData,
  session,
}: ClientMyPageProps) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const _handlePageChange = async (page: number) => {
    setIsLoading(true);
    try {
      const newData = await fetchResponses(page);
      setData(newData);

      // URLを更新
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`?${params.toString()}`);
    } catch (error) {
      console.error("Failed to fetch responses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return <div>ログインしてください</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100 p-8">
      <h1 className="text-3xl font-bold mb-8">マイページ</h1>
      <Link href="/">
        <button
          type="button"
          className="flex items-center bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-opacity-50 border-2 border-pink-700 mb-8"
        >
          <HomeIcon className="h-6 w-6 mr-2" />
          ホームに戻る
        </button>
      </Link>
      <h2 className="text-2xl font-semibold mb-4">過去の回答</h2>

      {isLoading ? (
        <div className="text-center py-4">読み込み中...</div>
      ) : (
        <>
          {data.responses.map((response) => (
            <div
              key={response.id}
              className="bg-white rounded-lg shadow-md p-6 mb-4 w-full max-w-2xl"
            >
              <ScoreBadge score={response.score} size="small" />
              <h3 className="text-xl font-bold mb-2">
                お題: {response.prompt}
              </h3>
              <p className="mb-2">
                <strong>回答:</strong> {response.response}
              </p>
              <p>
                <strong>評価:</strong> {response.evaluation}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(response.createdAt).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}

          <Pagination
            totalItems={data.pagination.total}
            defaultItemsPerPage={data.pagination.limit}
            delta={2}
          />
        </>
      )}
    </div>
  );
}
