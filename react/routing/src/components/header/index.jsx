// import { useLocation } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import React from "react";

import { navItems } from "../../constants";

import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { Badge, Button, Typography } from "@mui/joy";
import LogoSrc from "../../assets/images/logo.svg";

export const Header = ({ favorites }) => {
  // const { pathname } = useLocation();

  // console.log(navItems);
  console.log(favorites);

  return (
    <div className="sticky top-0 z-20 w-full py-2 px-10 bg-primary flex justify-between">
      <Link to="/">
        <img src={LogoSrc} alt="Logo" className="h-12" />
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
                `text-white text-lg font-light uppercase ${
                  isActive && "text-purple-900"
                }`
              }
            >
              {navItem.title}
            </NavLink>
          );
        })}

        <Link to="/favorites">
          <Badge size="sm" badgeContent={favorites.length} color="danger">
            <Typography sx={{ fontSize: "xl" }}>💌</Typography>
          </Badge>
        </Link>
      </div>
    </div>
  );
};
