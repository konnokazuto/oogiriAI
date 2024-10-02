import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  onSubmit: () => void;
  isLoading: boolean;
}
import { Kosugi_Maru } from "next/font/google";

const KosugiMaru6Font = Kosugi_Maru({
  weight: "400",
  subsets: ["latin"],
});

const TextareaWithButton = ({
  value,
  onChange,
  placeholder,
  onSubmit,
  isLoading,
}: TextareaProps) => {
  return (
    <div className="flex flex-col items-end">
      <Textarea
        className={`${KosugiMaru6Font.className} min-h-[80px] w-[300px] md:w-[500px] border-2 border-pink-300 bg-pink-50 text-gray-700 rounded-lg p-4 shadow-md focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-opacity-50 resize-none mb-4`}
        rows={4}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <Button
        onClick={onSubmit}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-opacity-50 border-2 border-pink-700"
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
