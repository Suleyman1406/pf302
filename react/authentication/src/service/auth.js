import axios from "axios";
import { BASE_URL } from "../constants";

export async function register(data) {
  return await axios.post(`${BASE_URL}/register`, data);
}

export async function login(data) {
  return await axios.post(`${BASE_URL}/login`, data);
}

export async function getCurrentUser(token) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const response = await axios.get(`${BASE_URL}/current-user`, {
    headers: {
      Authorization: token,
    },
  });

  return { data: response.data, status: response.status };
}
