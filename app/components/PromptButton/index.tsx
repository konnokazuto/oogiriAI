"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
interface PromptButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

const PromptButton: React.FC<PromptButtonProps> = ({ onClick, isLoading }) => {
  return (
    <Button
      className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-8 px-16 rounded-full shadow-xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-opacity-50 border-2 border-pink-700 text-lg"
      onClick={onClick}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        "お題をもらう"
      )}
    </Button>
  );
};

export default PromptButton;
