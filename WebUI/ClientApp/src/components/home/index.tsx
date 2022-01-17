import * as React from "react";
import { Link } from "react-router-dom";
import Game from "../game";

const HomePage = () => {
  React.useState(() => {
    console.log("Render ");
  });
  return <>
  <Game />
  </>;
};

export default HomePage;
