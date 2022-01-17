import * as React from "react";

import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";

import Shop from "../../shop";
import Storage from "../../storage/pages";

import Game from "../../game";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      {/* <Game /> */}
      <div
        className="container-fluid"
        // style={{ minHeight: "calc(100vh - 75px)" }}
      >
        <Outlet />

        <Shop />
        <Storage />
      </div>
      <Footer />
    </>
  );
};

export default DefaultLayout;
