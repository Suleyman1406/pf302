import SettingsIcon from "@/assets/icons/settings.svg";
import HeartIcon from "@/assets/icons/heart.svg";
import NofiticationIcon from "@/assets/icons/notification.svg";
import { LogOutIcon, User2Icon } from "lucide-react";

import { Link } from "react-router-dom";
import { DialogTypeEnum, useDialog } from "@/hooks/useDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRole } from "@/types";
import { paths } from "@/constants/paths";

export const NavbarActions = () => {
  const { openDialog } = useDialog();

  return (
    <div className="flex gap-3 lg:gap-5">
      <Link
        to="/"
        className="rounded-full border border-[#c3d4e966] opacity-80 hover:opacity-100 duration-75 p-2.5"
      >
        <img src={HeartIcon} alt="favorites icon" />
      </Link>
      <Link
        to="/"
        className="rounded-full border border-[#c3d4e966] opacity-80 hover:opacity-100 duration-75 p-2.5"
      >
        <img src={NofiticationIcon} alt="notification icon" />
      </Link>
      <Link
        to="/"
        className="rounded-full border border-[#c3d4e966] opacity-80 hover:opacity-100 duration-75 p-2.5"
      >
        <img src={SettingsIcon} alt="settings icon" />
      </Link>
      <Button onClick={() => openDialog(DialogTypeEnum.LOGIN)}>Sign In</Button>

      {/* {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full border border-[#c3d4e966] opacity-80 hover:opacity-100 duration-75 p-2.5">
              <User2Icon color="#596780" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user.role === UserRole.Admin && (
              <DropdownMenuItem asChild>
                <Link to={paths.DASHBOARD.MAIN}>Dashboard</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/reservations">Reservations</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOutIcon />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => openDialog(DialogTypeEnum.LOGIN)}>Sign In</Button>
      )} */}
    </div>
  );
};
