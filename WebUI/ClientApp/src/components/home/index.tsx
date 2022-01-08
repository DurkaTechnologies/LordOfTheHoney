import * as React from "react";
import { Link } from "react-router-dom";
import Shop from "../shop";
import Storage from "../storage/pages";

const HomePage = () => {
  React.useState(() => {
    console.log("Render ");
  });
  return (
    <>
      <h1 className="title is-1">Home page</h1>
      <Shop />
      <Storage />
    </>
  );
};

export default HomePage;
