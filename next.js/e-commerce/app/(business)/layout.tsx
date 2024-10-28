import { Navbar } from "@/components/shared/Navbar";
import { ClerkLoaded } from "@clerk/nextjs";
import React, { PropsWithChildren } from "react";

const BusinessLayout = ({ children }: PropsWithChildren) => {
  return (
    <ClerkLoaded>
      <div>
        <Navbar />
        {children}
      </div>
    </ClerkLoaded>
  );
};

export default BusinessLayout;
