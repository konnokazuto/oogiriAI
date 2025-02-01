import { compare } from "bcrypt";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log("1. 受信データ - email:", email);

    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log(
      "2. ユーザー検索結果:",
      user ? "見つかりました" : "見つかりません"
    );

    if (!user?.password) {
      console.log("3. パスワードが存在しません");
      return NextResponse.json(null);
    }

    const isValid = await compare(password, user.password);
    console.log("4. パスワード照合結果:", isValid);

    if (!isValid) {
      console.log("5. パスワードが一致しません");
      return NextResponse.json(null);
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.username,
      username: user.username,
    });
  } catch (error) {
    console.error("エラー発生:", error);
    return NextResponse.json(null);
  }
}
