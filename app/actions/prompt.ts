"use server";

import { auth } from "@/auth";

export async function getPrompt() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/get-prompt`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch prompt");
    return await res.json();
  } catch {
    throw new Error("Error fetching prompt");
  }
}

export async function evaluateResponse(prompt: string, response: string) {
  try {
    console.log("Evaluating:", { prompt, response });

    const res = await fetch(`${process.env.API_URL}/api/evaluate-response`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        response,
      }),
    });

    console.log("Response status:", res.status);

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error data:", errorData);
      throw new Error("Failed to evaluate");
    }

    return await res.json();
  } catch {
    throw new Error("Error evaluating response");
  }
}

export async function saveUserResponse(
  prompt: string,
  response: string,
  evaluation: string,
  score: number
) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const res = await fetch(`${process.env.API_URL}/api/save-response`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        response,
        evaluation,
        score,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to save response");
    }

    return await res.json();
  } catch {
    throw new Error("Error saving response");
  }
}
