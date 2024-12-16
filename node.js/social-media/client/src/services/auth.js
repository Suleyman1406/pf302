import { BASE_URL } from "@/constants";
import axiosInstance from "./instance";

export async function register(data) {
  return await axiosInstance.post(`/auth/register`, data);
}

export async function login(data) {
  return await axiosInstance.post(`/auth/login`, data);
}

export async function logout() {
  return await axiosInstance.post(`/auth/logout`, null);
}

export async function getCurrentUser() {
  const response = await axiosInstance.get(`/auth/current-user`);

  return { data: response.data, status: response.status };
}

export async function forgotPassword(data) {
  return await axiosInstance.post(`/auth/forgot-password`, data);
}

export async function resetPassword(data) {
  return await axiosInstance.post(`/auth/reset-password`, data);
}
