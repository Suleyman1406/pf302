import { Outlet } from "react-router-dom";
import React from "react";

import { MobileNavigation } from "@/components/shared/mobile-navigation";
import { Sidebar } from "@/components/shared/sidebar";
import { PostActionDialog } from "@/components/shared/post-action-dialog";

const RootLayout = () => {
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
