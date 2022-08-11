import { useGameStateStore } from "../stores/GameStateStore";

const ScoreDisplay = () => {
  const score = useGameStateStore((state) => state.score);

  return <h1>Score: {score}</h1>;
};

export default ScoreDisplay;
