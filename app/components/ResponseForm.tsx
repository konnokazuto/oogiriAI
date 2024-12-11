import type React from "react";
import { useState } from "react";

interface ResponseFormProps {
  onSubmit: (response: string) => void;
}

const ResponseForm: React.FC<ResponseFormProps> = ({ onSubmit }) => {
  const [response, setResponse] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="あなたの回答を入力してください"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        送信
      </button>
    </form>
  );
};

export default ResponseForm;
