import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";

import { Dialogs } from "./dialogs";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Dialogs />
    </div>
  );
};

export default RootLayout;
