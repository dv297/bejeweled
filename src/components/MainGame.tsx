import ScoreDisplay from "./ScoreDisplay";
import AudioElement from "./AudioElement";
import Board from "./Board";

const MainGame = () => {
  return (
    <>
      <AudioElement />
      <div className="flex flex-row h-screen">
        <ScoreDisplay />
        <div className="game-area flex flex-col justify-center items-center w-full">
          <Board />
        </div>
      </div>
    </>
  );
};

export default MainGame;
