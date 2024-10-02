import { BASE_URL } from "@/constants";
import axios from "axios";

export async function getPosts({ pageParam }) {
  try {
    const response = await axios(`${BASE_URL}/posts?page=${pageParam}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
export async function createPost(formData) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await axios.post(`${BASE_URL}/posts`, formData);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
