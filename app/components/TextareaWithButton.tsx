import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import * as z from "zod";

interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  onSubmit: () => void;
  isLoading: boolean;
  maxLength?: number;
}

const TextareaWithButton = ({
  value = "",
  onChange,
  placeholder,
  onSubmit,
  isLoading,
  maxLength = 30,
}: TextareaProps) => {
  // Zodスキーマをコンポーネント内で定義
  const textSchema = z
    .string()
    .max(maxLength, `${maxLength}文字以内で入力してください`);

  // 入力開始フラグ
  const [isDirty, setIsDirty] = useState(false);

  const handleChnage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 一度でも入力があればdirtyフラグを立てる
    if (e.target.value.length > 0) {
      setIsDirty(true);
    }
    onChange(e);
  };

  const validation = textSchema.safeParse(value);
  const isOverLimit = !validation.success;
  const isEmpty = !value.trim();
  const isDisabled = isOverLimit || isEmpty || isLoading;

  return (
    <div className="flex flex-col items-end">
      <div className="w-full">
        <Textarea
          className={`min-h-[80px] w-[300px] md:w-[500px] border-2 ${
            isDirty && (isOverLimit || isEmpty)
              ? "border-red-500 focus:ring-red-300"
              : "border-pink-300 focus:ring-pink-300"
          } bg-pink-50 text-gray-700 rounded-lg p-4 shadow-md focus:outline-none focus:ring-4 focus:ring-opacity-50 resize-none mb-2`}
          rows={4}
          value={value}
          onChange={handleChnage}
          placeholder={placeholder}
          onBlur={() => setIsDirty(true)}
        />
        <div className="text-right text-sm mb-2 text-gray-500">
          {value.length} / {maxLength}文字
          {isDirty && (
            <>
              {isOverLimit && (
                <div className="text-red-500">
                  {maxLength}文字以内で入力してください
                </div>
              )}
              {isEmpty && (
                <div className="text-red-500">回答を入力してください</div>
              )}
            </>
          )}
        </div>
      </div>
      <Button
        onClick={onSubmit}
        disabled={isDisabled}
        className={`${
          isDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-pink-500 hover:bg-pink-600"
        } text-white font-bold py-4 px-8 rounded-full shadow-xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-opacity-50 border-2 ${
          isDisabled ? "border-gray-500" : "border-pink-700"
        }`}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "回答する"
        )}
      </Button>
    </div>
  );
};

export default TextareaWithButton;
