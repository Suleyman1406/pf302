import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect } from "react";

import { MobileNavigation } from "@/components/shared/mobile-navigation";
import { PostActionDialog } from "@/components/shared/post-action-dialog";
import {
  clearAuth,
  getCurrentUserAsync,
  selectUser,
} from "@/store/auth/authSlice";
import { Sidebar } from "@/components/shared/sidebar";
import { PATHS } from "@/constants/paths";

const RootLayout = () => {
  const { user, loading } = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserAsync());

    // return () => {
    //   dispatch(clearAuth());
    // };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={PATHS.LOGIN} />;
  }

  return (
    <div className="md:flex">
      <Sidebar />
      <div className={`md:w-[calc(100%-240px)] `}>
        <Outlet />
      </div>
      <PostActionDialog />
      <MobileNavigation />
    </div>
  );
};

export default RootLayout;
