import { Outlet } from "react-router-dom";
import React from "react";

import { MobileNavigation } from "@/components/shared/mobile-navigation";
import { Sidebar } from "@/components/shared/sidebar";

const RootLayout = () => {
  return (
    <div className="md:flex">
      <Sidebar />
      <div className={`md:w-[calc(100%-240px)]`}>
        <Outlet />
      </div>
      <MobileNavigation />
    </div>
  );
};

export default RootLayout;
