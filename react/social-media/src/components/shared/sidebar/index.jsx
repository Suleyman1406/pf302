import { NAV_ITEMS } from "@/constants/nav-items";
import { cn } from "@/lib/utils";
import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="md:w-[240px] md:h-screen sticky top-0 bg-black text-white md:px-6 py-4 px-3 md:py-0 md:pt-12">
      <Link to="/" className="flex gap-3 items-center text-xl font-bold">
        <img src="/logo.svg" />
        <h1>CodeGram</h1>
      </Link>
      <ul className="hidden md:flex flex-col gap-6 px-3 mt-12">
        {NAV_ITEMS.map((item) => (
          <Link
            to={item.to}
            className={cn(
              `flex items-center gap-2 font-bold`,
              location.pathname === item.to && "text-purple-400"
            )}
          >
            <item.icon className="w-6 h-6" />
            {item.title}
          </Link>
        ))}
      </ul>
    </div>
  );
};
