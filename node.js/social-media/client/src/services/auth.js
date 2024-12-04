import { BASE_URL } from "@/constants";
import axios from "axios";

export async function register(data) {
  return await axios.post(`${BASE_URL}/auth/register`, data, {
    withCredentials: true,
  });
}

export async function login(data) {
  return await axios.post(`${BASE_URL}/auth/login`, data, {
    withCredentials: true,
  });
}

export async function logout() {
  return await axios.post(`${BASE_URL}/auth/logout`, null, {
    withCredentials: true,
  });
}

export async function getCurrentUser() {
  const response = await axios.get(`${BASE_URL}/auth/current-user`, {
    withCredentials: true,
  });

  return { data: response.data, status: response.status };
}

export async function forgotPassword(data) {
  return await axios.post(`${BASE_URL}/auth/forgot-password`, data, {
    withCredentials: true,
  });
}

export async function resetPassword(data) {
  return await axios.post(`${BASE_URL}/auth/reset-password`, data, {
    withCredentials: true,
  });
}
