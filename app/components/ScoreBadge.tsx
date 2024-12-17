import { cn } from "@/lib/utils";

interface ScoreBadgeProps {
  score: number;
  size?: "large" | "small";
}

const ScoreBadge = ({ score, size = "large" }: ScoreBadgeProps) => {
  const colorStyles = {
    container: cn("text-center flex items-center", {
      "text-yellow-500 glow-strong-yellow": score >= 90,
      "text-gray-700 glow-strong-gray": score >= 70 && score < 90,
      "text-red-600 glow-strong-red": score < 70,
    }),

    wrapper: cn("flex items-baseline", {
      "space-x-2": size === "large",
      "space-x-1 mb-3": size === "small",
    }),

    score: cn("font-bold", {
      "text-2xl tracking-widest": size === "large",
      "text-sm tracking-wide": size === "small",
    }),

    number: cn("font-extrabold", {
      "text-7xl": size === "large",
      "text-3xl": size === "small",
    }),

    point: cn("font-medium", {
      "text-3xl": size === "large",
      "text-lg": size === "small",
    }),
  };

  return (
    <div className={colorStyles.container}>
      <div className={colorStyles.wrapper}>
        <div className={colorStyles.score}>SCORE</div>
        <div className={colorStyles.number}>{score}</div>
        <div className={colorStyles.point}>点</div>
      </div>
    </div>
  );
};

export default ScoreBadge;
