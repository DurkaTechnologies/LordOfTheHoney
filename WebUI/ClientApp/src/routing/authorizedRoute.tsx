import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const AuthorizedRoute = () => {
  const { isAuth } = useTypedSelector((redux) => redux.auth);

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthorizedRoute;
