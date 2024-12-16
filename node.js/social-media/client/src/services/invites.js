import axiosInstance from "./instance";

export async function getUserInvites({ pageParam }) {
  try {
    const resp = await axiosInstance.get(`/invite/getAll?page=${pageParam}`);
    return resp.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function sendFollowRequest(recipientId) {
  try {
    const resp = await axiosInstance.post(`/invite/${recipientId}/send`, {});
    console.log(resp.data);
    return resp;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function acceptFollowRequest(requestId) {
  try {
    const resp = await axiosInstance.patch(`/invite/${requestId}/accept`, {});
    console.log(resp.data);
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function rejectFollowRequest(requestId) {
  try {
    const resp = await axiosInstance.patch(`/invite/${requestId}/reject`, {});
    console.log(resp.data);
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function unfollowUser(userId) {
  try {
    const resp = await axiosInstance.delete(`/invite/${userId}/unfollow`);
    console.log(resp.data);
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function retractFollowRequest(senderId) {
  try {
    const resp = await axiosInstance.delete(`/invite/${senderId}/retract`);
    return resp.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
