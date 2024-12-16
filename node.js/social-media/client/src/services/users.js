import axiosInstance from "./instance";

export async function searchUsers({ pageParam, search = "" }) {
  try {
    const response = await axiosInstance.get(
      `/user?page=${pageParam}&search=${search}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function editUser(formData) {
  try {
    const resp = await axiosInstance.patch(`/user`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getFriends() {
  try {
    const response = await axiosInstance.get(`/user/friends`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
export async function getConversations() {
  try {
    const response = await axiosInstance.get(`/conversation`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
