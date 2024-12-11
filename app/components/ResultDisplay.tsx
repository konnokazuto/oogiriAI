import type React from "react";

interface ResultDisplayProps {
  evaluation: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ evaluation }) => {
  return (
    <div className="result">
      <h2>AIの評価</h2>
      <p>{evaluation}</p>
    </div>
  );
};

export default ResultDisplay;
