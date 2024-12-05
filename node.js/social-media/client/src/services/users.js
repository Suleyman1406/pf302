import { BASE_URL } from "@/constants";
import axios from "axios";

export async function searchUsers({ pageParam, search = "" }) {
  try {
    const response = await axios.get(`${BASE_URL}/user?page=${pageParam}&search=${search}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function editUser(formData) {
  try {
    const resp = await axios.patch(`${BASE_URL}/user`, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.error(error);
  }
}