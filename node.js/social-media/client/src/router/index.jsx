import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "../constants/paths";
import HomePage from "@/pages/home";
import RootLayout from "@/layouts/root";
import { Suspense, lazy } from "react";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import ForgotPasswordPage from "@/pages/forgot-password";
import ResetPasswordPage from "@/pages/reset-password";
import AuthLayout from "@/layouts/auth";
// import SavedPostsPage from "@/pages/saved-posts";
const SavedPostsPage = lazy(() => import("@/pages/saved-posts"));

export const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: PATHS.SAVED,
        element: (
          <Suspense fallback={<div>loading....</div>}>
            <SavedPostsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "",
    element: <AuthLayout />,
    children: [
      {
        path: PATHS.LOGIN,
        element: <LoginPage />,
      },
      {
        path: PATHS.REGISTER,
        element: <RegisterPage />,
      },
      {
        path: PATHS.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
      {
        path: PATHS.RESET_PASSWORD,
        element: <ResetPasswordPage />,
      },
    ],
  },
]);
