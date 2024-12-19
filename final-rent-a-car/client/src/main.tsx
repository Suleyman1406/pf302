import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";

import queryClient from "./config/query";
import { router } from "./router";

import "./style/global.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <Toaster richColors />
  </QueryClientProvider>
);
