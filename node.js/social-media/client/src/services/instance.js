import { BASE_URL } from "@/constants";
import { unauthenticatedRoutes } from "@/constants/paths";
import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      !unauthenticatedRoutes.includes(window.location.pathname)
    ) {
      window.location.href = "/login?alert=session-expired";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
