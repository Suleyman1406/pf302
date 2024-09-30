import { useLocation, Link } from "react-router-dom";
import React from "react";

import { NAV_ITEMS } from "@/constants/nav-items";
import { cn } from "@/lib/utils";

export const MobileNavigation = () => {
  const { pathname } = useLocation();
  return (
    <div className="fixed bottom-0 w-full flex md:hidden bg-black py-4">
      {NAV_ITEMS.map((item) => (
        <Link
          to={item.to}
          className={cn(
            "flex-1 flex flex-col items-center text-white",
            pathname === item.to && "text-purple-400"
          )}
        >
          <item.icon className="w-6 h-6" />
          <span>{item.title}</span>
        </Link>
      ))}
    </div>
  );
};
