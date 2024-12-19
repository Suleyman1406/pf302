import axiosInstance from "../axiosInstance";
import { RegisterPayload } from "./types";

async function register(data: RegisterPayload) {
  return await axiosInstance.post("/auth/register", data);
}

const authService = {
  register,
};

export default authService;
