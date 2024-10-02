interface PromptDisplayProps {
  prompt: string;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt }) => {
  return (
    <div className="prompt">
      <h2>{prompt}</h2>
    </div>
  );
};

export default PromptDisplay;
