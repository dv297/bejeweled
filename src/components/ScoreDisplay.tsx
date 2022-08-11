import { useGameStateStore } from "../stores/GameStateStore";

const ScoreDisplay = () => {
  const score = useGameStateStore((state) => state.score);

  return (
    <div className="score-container w-64 py-4 h-screen text-white text-center drop-shadow-md shadow-lg">
      <span className="font-bold text-lg">Score: {score}</span>
    </div>
  );
};

export default ScoreDisplay;
