import axiosInstance from "./instance";

export async function getConversation({ receiverId }) {
  try {
    const response = await axiosInstance.get(`/conversation/${receiverId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
