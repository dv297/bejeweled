import React, { useState } from "react";

import MainGame from "./components/MainGame";
import MainMenu from "./components/MainMenu";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      {isPlaying ? (
        <MainGame />
      ) : (
        <MainMenu
          onPlayClick={() => {
            setIsPlaying(true);
          }}
        />
      )}
    </div>
  );
}

export default App;
