import * as React from "react";
import { Link } from "react-router-dom";
import Shop from "../shop";

const HomePage = () => {
  React.useState(() => {
    console.log("Render ");
  });
  return (
    <>
      <h1 className="title is-1">Home page</h1>;
      <Shop />
    </>
  );
};

export default HomePage;
