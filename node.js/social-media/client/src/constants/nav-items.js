import { BookmarkIcon, PlusIcon, SearchIcon } from "lucide-react";
import { PATHS } from "./paths";
import { Binoculars } from "lucide-react";
import { PersonIcon } from "@radix-ui/react-icons";
import { HomeIcon } from "lucide-react";

export const NAV_ITEMS = [
  {
    title: "Feed",
    icon: HomeIcon,
    to: PATHS.FEED,
  },
  {
    title: "Discover",
    icon: Binoculars,
    to: PATHS.DISCOVER,
  },
  {
    title: "Saved",
    icon: BookmarkIcon,
    to: PATHS.SAVED,
  },
  {
    title: "Profile",
    icon: PersonIcon,
    to: PATHS.PROFILE,
  },
  {
    title: "Invites",
    icon: PlusIcon,
    to: PATHS.INVITES,
  },
  {
    title: "Search",
    icon: SearchIcon,
    to: PATHS.SEARCH,
  },
];
