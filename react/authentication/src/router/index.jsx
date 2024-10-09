import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/home";
import DashBoardPage from "../pages/dashboard";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import ProtectedRoute from "../components/protected-route";

import { paths } from "../constants/paths";
import AuthRoute from "../components/auth-route";

export const router = createBrowserRouter([
  {
    path: "",
    element: <ProtectedRoute />,
    children: [
      {
        path: paths.home,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "",
    element: <ProtectedRoute isAdmin />,
    children: [
      {
        path: paths.dashboard,
        element: <DashBoardPage />,
      },
    ],
  },
  {
    path: "",
    element: <AuthRoute />,
    children: [
      {
        path: paths.login,
        element: <LoginPage />,
      },
      {
        path: paths.register,
        element: <RegisterPage />,
      },
    ],
  },
]);
