"use server";

import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";

export async function fetchResponses(page: number = 1, limit: number = 5) {
  const session = await auth();

  if (!session) {
    throw new Error("認証が必要です");
  }

  try {
    const skip = (page - 1) * limit;

    // 総件数を取得
    const total = await prisma.response.count({
      where: {
        userId: session.user?.id,
      },
    });

    // ページネーションを適用してデータを取得
    const responses = await prisma.response.findMany({
      where: {
        userId: session.user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    return {
      responses,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        limit,
      },
    };
  } catch (error) {
    console.error("Error fetching responses:", error);
    throw new Error("データの取得に失敗しました");
  }
}
