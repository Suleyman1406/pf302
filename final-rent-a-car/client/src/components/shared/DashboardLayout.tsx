import { Navigate, Outlet } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserRole } from "@/types";
import { paths } from "@/constants/paths";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full px-6 relative pt-4">
        <SidebarTrigger className="absolute left-8 top-6" />
        <div className="p-6 rounded-[10px] bg-white w-full">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
