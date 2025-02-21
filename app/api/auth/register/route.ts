import { hash } from "bcrypt";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { name }],
      },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "このメールアドレスまたはユーザー名は既に使用されています" },
        { status: 400 }
      );
    }
    const hashedPassword = await hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    return NextResponse.json({ user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "ユーザー登録に失敗しました" },
      { status: 500 }
    );
  }
}
