"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import PromptButton from "./PromptButton";
import TextareaWithButton from "./TextareaWithButton";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import ScoreBadge from "./ScoreBadge";
import { HomeIcon } from "@heroicons/react/24/solid";

const Home = () => {
  const { data: session } = useSession();
  const [getPromptResponse, setGetPromptResponse] = useState("");
  const [evaluateResponse, setEvaluateResponse] = useState("");
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

  const getPromptAPI = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/get-prompt");
      if (!res.ok) {
        throw new Error("Failed to fetch get-prompt");
      }
      const data = await res.json();
      setGetPromptResponse(data.prompt || "No prompt received"); // 修正
      setShowTextarea(true);
      setShowEvaluation(false); // 追加
    } catch (error) {
      setGetPromptResponse("Error fetching prompt");
    } finally {
      setIsLoading(false);
    }
  };

  const evaluateResponseAPI = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/evaluate-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: getPromptResponse,
          response: response,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch evaluate-response");
      }
      const data = await res.json();
      setEvaluateResponse(data.evaluation || "No evaluation received"); // 修正
      setEvaluationScore(typeof data.score === "number" ? data.score : null);
      setShowEvaluation(true); // 追加
      setShowTextarea(false); // 追加
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
    } catch (error) {
      setEvaluateResponse("Error fetching evaluation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-br from-pink-100 to-yellow-100 relative">
      {/* <div className="flex justify-center items-center space-x-4">
        {session ? (
          <>
            <Link href="/mypage">
              <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 border-2 border-blue-700">
                マイページ
              </button>
            </Link>
            <button
              onClick={async () => {
                await signOut();
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-50 border-2 border-red-700"
            >
              ログアウト
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50 border-2 border-green-700"
          >
            ログイン
          </button>
        )}
      </div> */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleUserIconClick}
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          <UserCircleIcon className="h-12 w-12" />
        </button>
      </div>
      <div
        className="mx-auto p-4 bg-dojo bg-no-repeat bg-center flex justify-center w-full bg-contain flex-col "
        style={{ height: "670px" }}
      >
        <div className="flex justify-center items-center flex-col">
          <div className="font-mplus font-medium fukidashi-01-06 bg-white text-lg max-w-xl`">
            {evaluationScore !== null && <ScoreBadge score={evaluationScore} />}
            <div>
              {evaluateResponse
                ? evaluateResponse
                : getPromptResponse || initialMessage}
            </div>
          </div>
          <Image
            src="/flog.png"
            alt="cat"
            width={300}
            height={300}
            style={{ objectFit: "cover" }} // 修正
          />
          {/* <button className="flex items-center bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-opacity-50 border-2 border-pink-700">
            <HomeIcon className="h-6 w-6 mr-2" />
            ホーム
          </button> */}
        </div>
      </div>
      <div className="flex justify-center">
        {!showTextarea && !showEvaluation && (
          <PromptButton isLoading={isLoading} onClick={getPromptAPI} />
        )}
        {showTextarea && !showEvaluation && (
          <div className="flex flex-col items-center mt-4">
            <TextareaWithButton
              value={response}
              onSubmit={evaluateResponseAPI}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="ここに回答を書いてください..."
              isLoading={isLoading}
            />
          </div>
        )}
        {!showTextarea && showEvaluation && (
          <div className="flex flex-col items-left">
            <p className="font-mplus font-bold text-xl">あなたの回答</p>
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
            <button className="flex items-center bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-opacity-50 border-2 border-pink-700">
              <HomeIcon className="h-6 w-6 mr-2" />
              ホーム
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
