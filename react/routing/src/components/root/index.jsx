import React from "react";
import { Header } from "../header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const Root = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
};

export default Root;
