import RoundButton from "./RoundButton";

interface MainMenuProps {
  onPlayClick: () => void;
}

const MainMenu = (props: MainMenuProps) => {
  const { onPlayClick } = props;

  return (
    <div>
      <div className="mt-8">
        <div className="pt-8 text-6xl uppercase font-bold">Bejeweled</div>
        <RoundButton
          onClick={onPlayClick}
          className="mt-16 text-2xl py-4 w-32 text-center items-center justify-center"
        >
          Play
        </RoundButton>
      </div>
    </div>
  );
};

export default MainMenu;
