import getCurrentUser from "@/lib/current-user";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  const user = await getCurrentUser();

  if (!user || user.role !== Role.ADMIN) {
    redirect("/");
  }

  return <>{children}</>;
};

export default DashboardLayout;
