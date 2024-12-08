import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  console.log("Session:", session); // セッションの内容をログ出力

  if (!session) {
    console.log("No session found");
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  if (!session.user) {
    console.log("No user in session");
    return NextResponse.json(
      { error: "ユーザー情報が見つかりません" },
      { status: 401 }
    );
  }

  if (!session.user.id) {
    console.log("No user id in session");
    return NextResponse.json(
      { error: "ユーザーIDが見つかりません" },
      { status: 401 }
    );
  }

  const { prompt, response, evaluation, score } = await req.json();

  try {
    const savedResponse = await prisma.response.create({
      data: {
        userId: session.user.id,
        prompt,
        response,
        evaluation,
        score,
      },
    });
    console.log("Saved response:", savedResponse);
    return NextResponse.json(savedResponse);
  } catch (error) {
    console.error("Error saving response:", error);
    return NextResponse.json(
      { error: "回答の保存に失敗しました" },
      { status: 500 }
    );
  }
}
