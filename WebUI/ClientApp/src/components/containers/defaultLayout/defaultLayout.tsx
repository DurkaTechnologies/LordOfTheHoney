import * as React from "react";

import { Outlet } from "react-router";
import Header from "./header";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <Outlet />
      </div>
    </>
  );
};

export default DefaultLayout;
