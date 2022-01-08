import * as React from "react";

import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <div
        className="container-fluid"
        style={{ minHeight: "calc(100vh - 75px)" }}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default DefaultLayout;
