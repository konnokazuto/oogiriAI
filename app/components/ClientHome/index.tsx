"use client";
import { Menu, UserCircle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import PromptButton from "../PromptButton/index";
import ScoreBadge from "../ScoreBadge/index";
import TextareaWithButton from "../TextareaWithButton/index";
import { getPrompt, evaluateResponse } from "@/app/actions/prompt";

const Home = () => {
  const { data: session } = useSession();
  const [getPromptResponse, setGetPromptResponse] = useState("");
  const [evaluationResult, setEvaluationResult] = useState("");
  const [evaluationScore, setEvaluationScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTextarea, setShowTextarea] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [response, setResponse] = useState("");
  const initialMessage =
    "ここは大喜利道場じゃ。お主の大喜利力わしがチェックしてやるぞい。";
  const router = useRouter();

  const handleUserIconClick = () => {
    if (session) {
      router.push("/mypage");
    } else {
      signIn();
    }
  };

  const handleGetPrompt = async (shouldClearResponse = false) => {
    setIsLoading(true);
    try {
      const data = await getPrompt();
      setGetPromptResponse(data.prompt || "No prompt received");
      setShowTextarea(true);
      setShowEvaluation(false);
      setEvaluationResult("");
      setEvaluationScore(null);
      if (shouldClearResponse) {
        setResponse("");
      }
    } catch {
      setGetPromptResponse("Error fetching prompt");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEvaluateResponse = async () => {
    setIsLoading(true);
    try {
      console.log("Current prompt:", getPromptResponse);

      const data = await evaluateResponse(getPromptResponse, response);
      setEvaluationResult(data.evaluation || "No evaluation received");
      setEvaluationScore(typeof data.score === "number" ? data.score : null);
      setShowEvaluation(true);
      setShowTextarea(false);
      if (session) {
        const saveRes = await fetch("/api/save-response", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: getPromptResponse,
            response: response,
            evaluation: data.evaluation,
            score: data.score,
          }),
        });
        const saveData = await saveRes.json();
        if (!saveRes.ok) {
          console.error("Failed to save response:", saveData);
        }
      }
    } catch (_error) {
      setEvaluationResult("Error fetching evaluation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-full w-full relative">
      {evaluationScore !== null && (
        <div className="absolute top-[10px] left-1/2 transform -translate-x-1/2 z-10">
          <div className="p-2 rounded-lg">
            <ScoreBadge score={evaluationScore} />
          </div>
        </div>
      )}

      <div className="mx-auto pt-[60px] mt-[100px] bg-dojo bg-no-repeat bg-center bg-contain w-full flex justify-center flex-col h-[530px] mb-1">
        <div className="flex justify-center items-center flex-col relative">
          <div className="font-mplus font-medium fukidashi-01-06 bg-white text-lg w-[600px]">
            {evaluationResult
              ? evaluationResult
              : getPromptResponse || initialMessage}
          </div>
          <Image
            src="/flog.png"
            alt="cat"
            width={300}
            height={300}
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex justify-center">
        {!showTextarea && !showEvaluation && (
          <PromptButton
            isLoading={isLoading}
            onClick={() => handleGetPrompt(false)}
            className="mt-4"
          />
        )}
        {showTextarea && !showEvaluation && (
          <div className="flex flex-col items-center mt-4">
            <TextareaWithButton
              value={response}
              onSubmit={() => handleEvaluateResponse()}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="ここに回答を書いてください..."
              isLoading={isLoading}
            />
          </div>
        )}
        {!showTextarea && showEvaluation && (
          <div className="flex flex-col items-left">
            <p className="font-mplus font-bold text-xl mt-1">あなたの回答</p>
            <div className="flex flex-col items-center mt-4 p-4 border-2 border-gray-300 rounded-lg bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-pink-500 text-white font-bold py-1 px-2 rounded-l rounded-r shadow-lg">
                  お題
                </span>
                <span className="bg-white text-gray-700 font-semibold py-1 px-2 rounded-r">
                  {getPromptResponse}
                </span>
              </div>
              <div className="bg-gray-100 text-gray-800 font-bold py-4 px-8 rounded mt-2">
                {response}
              </div>
            </div>
            <div className="flex justify-end w-full">
              <button
                type="button"
                onClick={() => handleGetPrompt(true)}
                className="w-40 mt-4 flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-opacity-50 border-2 border-pink-700"
              >
                もう一度ボケる
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
