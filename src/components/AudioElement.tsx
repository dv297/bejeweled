const AudioElement = () => {
  return (
    <audio id="pop">
      <source src={`${process.env.PUBLIC_URL}/audio/pop.wav`} />
    </audio>
  );
};

export default AudioElement;
