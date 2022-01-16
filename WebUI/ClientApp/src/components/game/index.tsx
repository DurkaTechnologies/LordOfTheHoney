import * as React from "react";
import { useEffect } from "react";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { InitializeGame } from "./libs/initialize";
import Inventory from "./libs/inventory";

import "./style.css";

const Game = () => {
  const { switchIsHeader, switchIsInventory } = useActions();

  useEffect(() => {
    const init = new InitializeGame(switchHeader, switchInventory);
    init.initialize();
  });

  const switchHeader = (data: boolean) => {
    switchIsHeader(data);
  };
  const switchInventory = (data: boolean) => {
    switchIsInventory(data);
  };

  return (
    <>
      <img src="/images/cross.png" id="imgCross" alt="" />
      <canvas id="webgl"></canvas>;
      <Inventory />
    </>
  );
};

export default Game;
