import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { Outlet } from "react-router-dom";
import { paths } from "../../constants/paths";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUserAsync } from "../../store/features/userSlice";
import { USER_ROLE } from "../../constants";

const ProtectedRoute = ({ isAdmin = false }) => {
  const { token, loading, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && !user) {
      dispatch(getCurrentUserAsync(token));
    }
  }, [token]);

  if (!token) {
    return <Navigate to={paths.login} />;
  }

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Navigate to={paths.login} />;
  }

  if (isAdmin && user.role !== USER_ROLE.ADMIN) {
    return <Navigate to={paths.home} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
