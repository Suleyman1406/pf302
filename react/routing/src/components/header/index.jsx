// import { useLocation } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import React from "react";

import { navItems } from "../../constants";

import LogoSrc from "../../assets/images/logo.svg";

export const Header = () => {
  // const { pathname } = useLocation();

  // console.log(navItems);

  return (
    <div className="w-full py-6 px-10 bg-primary flex justify-between">
      <Link to="/">
        <img src={LogoSrc} alt="Logo" />
      </Link>
      <div className="flex  items-center gap-x-3">
        {navItems.map((navItem, idx) => {
          return (
            <NavLink
              key={idx}
              to={navItem.path}
              // className={`text-white text-xl font-light uppercase ${
              //   navItem.path === pathname && "text-purple-600 font-bold"
              // }`}
              className={({ isActive }) =>
                `text-white text-xl font-light uppercase ${
                  isActive && "text-purple-900"
                }`
              }
            >
              {navItem.title}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
