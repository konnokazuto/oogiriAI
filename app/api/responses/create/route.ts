import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, prompt, response, evaluation, score } = body;

    if (!userId || !prompt || !response || !evaluation || score === undefined) {
      return NextResponse.json(
        { error: "必要なデータが不足しています" },
        { status: 400 }
      );
    }

    const newResponse = await prisma.response.create({
      data: {
        userId,
        prompt,
        response,
        evaluation,
        score,
      },
    });

    return NextResponse.json(newResponse);
  } catch (error) {
    console.error("Error creating response:", error);
    return NextResponse.json(
      { error: "回答の作成に失敗しました" },
      { status: 500 }
    );
  }
}
