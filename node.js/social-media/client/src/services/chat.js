import { BASE_URL } from "@/constants";
import axios from "axios";

export async function getConversation({ receiverId }) {
  try {
    const response = await axios.get(`${BASE_URL}/conversation/${receiverId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
