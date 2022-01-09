import * as React from "react";
import { useEffect } from "react";
import { initializeThree } from "./libs/initialize";

import "./style.css";

const Game = () => {
  useEffect(() => {
    initializeThree();
  });

  return <canvas id="webgl"></canvas>;
};

export default Game;
