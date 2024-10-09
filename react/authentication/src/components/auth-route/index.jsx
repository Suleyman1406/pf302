import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { paths } from "../../constants/paths";

const AuthRoute = () => {
  const { token } = useSelector((state) => state.user);
  if (token) {
    return <Navigate to={paths.home} />;
  }
  return <Outlet />;
};

export default AuthRoute;
