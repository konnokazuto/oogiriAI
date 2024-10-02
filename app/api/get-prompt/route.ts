import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    console.log(openai);
    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "大喜利のお題を一つ提供してください。お題の作り方ですがIPPONグランプリのような出し方にしてください。例(一人称が「うち」の人が言いそうな事を言って下さい、１対１の戦闘で「フッフッフ それは残像だ」よりも相手がビビることを言って下さい、一筋の光とともにゆっくり空から降りてきたらイヤなものとは？)　文頭にお題という文字は入りません。「」も使わないでください",
        },
      ],
      stream: true,
    });

    let prompt = "";
    for await (const chunk of stream) {
      prompt += chunk.choices[0]?.delta?.content || "";
    }

    return NextResponse.json({ prompt: prompt.trim() });
  } catch (error) {
    console.error("Error in GET /api/get-prompt:", error);
    return NextResponse.json(
      { message: "お題の生成中にエラーが発生しました。" },
      { status: 500 }
    );
  }
}
