import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function PATCH(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    const { name } = await req.json();
    console.log(name);
    if (!name) {
      return NextResponse.json(
        { error: "ユーザー名を入力してください" },
        { status: 400 }
      );
    }

    const updateUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        name,
      },
    });
    console.log("Updated user:", updateUser);

    return NextResponse.json({
      user: updateUser,
      message: "ユーザー名を更新しました",
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "プロフィールの更新に失敗しました" },
      { status: 500 }
    );
  }
}
