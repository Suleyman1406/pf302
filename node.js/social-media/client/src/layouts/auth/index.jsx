import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";

import { getCurrentUserAsync, selectUser } from "@/store/auth/authSlice";
import { PATHS } from "@/constants/paths";
import { Navigate } from "react-router-dom";

const AuthLayout = () => {
  const { user, loading } = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to={PATHS.DISCOVER} />;
  }

  return <Outlet />;
};

export default AuthLayout;
