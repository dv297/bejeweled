import RoundButton from "./RoundButton";

interface MainMenuProps {
  onPlayClick: () => void;
}

const MainMenu = (props: MainMenuProps) => {
  const { onPlayClick } = props;

  return (
    <div>
      <div className="mt-8 text-center">
        <div className="pt-8 text-6xl font-bold">Bejeweled</div>
        <div className="pt-6">A learning experiment by Daniel Vu</div>
        <RoundButton
          onClick={onPlayClick}
          className="mt-8 text-2xl py-4 w-32 text-center items-center justify-center"
        >
          Play
        </RoundButton>
      </div>
    </div>
  );
};

export default MainMenu;
