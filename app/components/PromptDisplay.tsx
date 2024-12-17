interface PromptDisplayProps {
  prompt: string;
}

const PromptDisplay = ({ prompt }: PromptDisplayProps) => {
  return (
    <div className="prompt">
      <h2>{prompt}</h2>
    </div>
  );
};

export default PromptDisplay;
