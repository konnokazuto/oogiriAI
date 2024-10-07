type ScoreBadgeProps = {
  score: number;
  size?: "large" | "small";
};

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score, size = "large" }) => {
  let textColor = "";
  let glowEffect = "";

  if (score >= 90) {
    textColor = "text-yellow-500";
    glowEffect = "glow-strong-yellow";
  } else if (score >= 70) {
    textColor = "text-gray-700";
    glowEffect = "glow-strong-gray";
  } else {
    textColor = "text-red-600";
    glowEffect = "glow-strong-red";
  }

  const sizeClasses = {
    large: {
      container: "space-x-2 flex items-baseline",
      score: "text-2xl font-bold tracking-widest",
      number: "text-7xl font-extrabold",
      point: "text-3xl font-medium",
    },
    small: {
      container: "space-x-1 flex items-baseline mb-3",
      score: "text-sm font-bold tracking-wide",
      number: "text-3xl font-extrabold",
      point: "text-lg font-medium",
    },
  };
  type ScoreBadgeProps = {
    score: number;
    size?: "large" | "small";
  };

  const { container, score: scoreClass, number, point } = sizeClasses[size];

  return (
    <div
      className={`text-center ${textColor} ${glowEffect} flex items-center ${container}`}
    >
      <div className={scoreClass}>SCORE</div>
      <div className={number}>{score}</div>
      <div className={point}>点</div>
    </div>
  );
};

export default ScoreBadge;
