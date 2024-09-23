import React from "react";
import { Header } from "../header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { FavoriteContextProvider } from "../../context/favorite";
const Root = () => {
  return (
    <FavoriteContextProvider>
      <Header />
      <Outlet />
      <Toaster />
    </FavoriteContextProvider>
  );
};

export default Root;
