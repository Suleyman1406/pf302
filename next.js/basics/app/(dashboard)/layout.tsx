import { Metadata } from "next";
import React, { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s ~ Dashboard",
    default: "Dashboard",
  },
};

const NeseLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      {children}
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default NeseLayout;
