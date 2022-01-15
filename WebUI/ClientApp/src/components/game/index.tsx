import * as React from "react";
import { useEffect } from "react";
import { useActions } from "src/hooks/useActions";
import { InitializeGame } from "./libs/initialize";

import "./style.css";

const Game = () => {
  const { switchIsHeader } = useActions();

  useEffect(() => {
    const init = new InitializeGame(switchHeader);
    init.initialize();
  });

  const switchHeader = (data: boolean) => {
    switchIsHeader(data);
  };

  return (
    <>
      <img src="/images/cross.png" id="imgCross" alt="" />
      <canvas id="webgl"></canvas>;
    </>
  );
};

export default Game;
