import React from "react";
import { Header } from "../header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
const Root = () => {
  const [favorites, setFavorites] = useState([]);
  return (
    <div>
      <Header favorites={favorites} />
      <Outlet favorites={favorites} setFavorites={setFavorites} />
      <Toaster />
    </div>
  );
};

export default Root;
