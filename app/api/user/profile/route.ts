import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: Request) {
  // セッション情報を取得して認証を実施
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  // セッションのメールアドレスをもとにユーザー情報を取得
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "ユーザーが見つかりません" },
      { status: 404 }
    );
  }

  // 必要な情報のみ返却
  return NextResponse.json({
    name: user.name,
    email: user.email,
  });
}
