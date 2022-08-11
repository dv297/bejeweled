import ScoreDisplay from "./ScoreDisplay";
import AudioElement from "./AudioElement";
import Board from "./Board";

const MainGame = () => {
  return (
    <>
      <AudioElement />
      <div className="flex flex-row">
        <div className="w-64 py-4 bg-gray-200">
          <ScoreDisplay />
        </div>

        <div className="flex flex-col">
          <Board />
        </div>
      </div>
    </>
  );
};

export default MainGame;
