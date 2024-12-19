import { Navigate, Outlet } from "react-router-dom";
import { paths } from "@/constants/paths";

const AuthLayout = () => {
  return <Outlet />;
};

export default AuthLayout;
