import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const evaluateResponse = async (
  prompt: string,
  response: string
): Promise<{ evaluation: string; score: number }> => {
  const evaluationPrompt = `お題：「${prompt}」\nユーザーの回答：「${response}」\nこの回答を「ユーモア」の観点から評価して、100点満点で点数をつけてください。その後に、具体的なフィードバックも提供してください。つまらない場合は厳しい評価もしてください。回答は以下の形式で返してください：\n\n点数: [0-100の整数]\n評価: [評価とフィードバック]`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: evaluationPrompt }],
    max_tokens: 200,
  });

  const message = completion.choices[0]?.message?.content?.trim() ?? "";
  const scoreMatch = message.match(/点数: (\d+)/);
  const evaluationMatch = message.match(/評価: ([\s\S]+)/);

  const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
  console.log(score);
  const evaluation = evaluationMatch
    ? evaluationMatch[1].trim()
    : "評価を取得できませんでした。";

  return { evaluation, score };
};

export async function POST(req: Request) {
  const { prompt, response } = await req.json();
  try {
    const { evaluation, score } = await evaluateResponse(prompt, response);
    return NextResponse.json({ evaluation, score });
  } catch (error) {
    console.error("Error in /api/evaluate-response:", error);
    return NextResponse.json(
      { message: "評価中にエラーが発生しました。", error: error.message },
      { status: 500 }
    );
  }
}
