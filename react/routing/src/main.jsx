import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/home";
import ProductsPage from "./pages/products";
import ErrorPage from "./pages/error";
import NotFoundPage from "./pages/not-found";
import ServicesPage from "./pages/services";
import AboutPage from "./pages/about";
import Root from "./components/root";
import "react-loading-skeleton/dist/skeleton.css";
import "./style/global.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
