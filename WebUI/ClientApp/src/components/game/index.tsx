import * as React from "react";
import { useEffect } from "react";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { InitializeGame } from "./libs/initialize";
import Inventory from "./libs/inventory";
import Pocket from "./libs/inventory/pocket/";

import "./style.css";

const Game = () => {
  const { switchIsHeader, switchIsInventory, setCurrentPocketIndex } =
    useActions();

  useEffect(() => {
    const init = new InitializeGame(
      switchHeader,
      switchInventory,
      setCurrentPocketIndex
    );
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
      <Pocket />
    </>
  );
};

export default Game;
