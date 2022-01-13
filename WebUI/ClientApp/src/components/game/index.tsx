import * as React from "react";
import { useEffect } from "react";
import { InitializeGame } from "./libs/initialize";

import "./style.css";

const Game = () => {
  useEffect(() => {
    const init = new InitializeGame();
    init.initialize();
  });

  return <canvas id="webgl"></canvas>;
};

export default Game;
