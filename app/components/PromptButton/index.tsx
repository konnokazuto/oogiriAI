"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface PromptButtonProps {
  isLoading: boolean;
  onClick: () => void;
  className?: string;
}

const PromptButton = ({ onClick, isLoading, className }: PromptButtonProps) => {
  return (
    <Button
      className={cn(
        "bg-pink-500 hover:bg-pink-600 text-white font-bold py-8 px-16 rounded-full",
        "shadow-xl transition duration-300 transform hover:scale-105",
        "focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-opacity-50",
        "border-2 border-pink-700 text-lg",
        className
      )}
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
