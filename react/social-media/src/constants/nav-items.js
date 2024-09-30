import { BookmarkIcon } from "lucide-react";
import { HomeIcon } from "lucide-react";
import { PATHS } from "./paths";

export const NAV_ITEMS = [
  {
    title: "Home",
    icon: HomeIcon,
    to: PATHS.HOME,
  },
  {
    title: "Saved Posts",
    icon: BookmarkIcon,
    to: PATHS.SAVED,
  },
];
