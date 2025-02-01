import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { headers } from "next/headers";

export async function GET(request: Request) {
  try {
    const session = await auth();
    const headersList = headers();
    const allHeaders = Object.fromEntries(headersList.entries());

    if (!session) {
      return NextResponse.json(
        {
          error: "認証が必要です",
          debug: {
            headers: allHeaders,
            session: null,
          },
        },
        { status: 401 }
      );
    }

    if (!session.user?.id) {
      return NextResponse.json(
        { error: "ユーザーIDが見つかりません" },
        { status: 401 }
      );
    }

    // URLからクエリパラメータを取得
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    const skip = (page - 1) * limit;

    // 総件数を取得
    const total = await prisma.response.count({
      where: {
        userId: session.user.id,
      },
    });

    // ページネーションを適用してデータを取得
    const responses = await prisma.response.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    return NextResponse.json({
      responses,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching responses:", error);
    return NextResponse.json(
      { error: "データの取得に失敗しました" },
      { status: 500 }
    );
  }
}
