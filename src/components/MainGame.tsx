import { useGameStateStore } from "../stores/GameStateStore";
import Row from "./Row";
import ScoreDisplay from "./ScoreDisplay";
import AudioElement from "./AudioElement";

const MainGame = () => {
  const grid = useGameStateStore((state) => state.grid);

  return (
    <>
      <AudioElement />
      <div className="flex flex-row">
        <div className="w-64 py-4 bg-gray-200">
          <ScoreDisplay />
        </div>

        <div className="flex flex-col">
          {grid.map((row, index) => (
            <Row rowIndex={index} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MainGame;
