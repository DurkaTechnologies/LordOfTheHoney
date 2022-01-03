import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const RoleBasedRoute = () => {
  const { user } = useTypedSelector((redux) => redux.auth);
  const isAdmin = user?.role === "Administrator";

  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RoleBasedRoute;
// import * as React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// export interface RoleBasedRouteProps {
//   element: JSX.Element;
//   path: string;
// }

// function RoleBasedRoute({ element, path }: RoleBasedRouteProps) {
//   return <Route path={path} element={element} />;
// }

// export default RoleBasedRoute;
