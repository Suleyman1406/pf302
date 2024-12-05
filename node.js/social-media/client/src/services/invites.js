import { BASE_URL } from "@/constants";
import axios from "axios";

export async function getUserInvites({ pageParam }) {
  try {
    const resp = await axios.get(
      `${BASE_URL}/invite/getAll?page=${pageParam}`,
      { withCredentials: true }
    );
    return resp.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function sendFollowRequest(recipientId) {
  try {
    const resp = await axios.post(
      `${BASE_URL}/invite/${recipientId}/send`,
      {},
      { withCredentials: true }
    );
    console.log(resp.data);
    return resp;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function acceptFollowRequest(requestId) {
  try {
    const resp = await axios.patch(
      `${BASE_URL}/invite/${requestId}/accept`,
      {},
      { withCredentials: true }
    );
    console.log(resp.data);
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function rejectFollowRequest(requestId) {
  try {
    const resp = await axios.patch(
      `${BASE_URL}/invite/${requestId}/reject`,
      {},
      { withCredentials: true }
    );
    console.log(resp.data);
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function unfollowUser(userId) {
  try {
    const resp = await axios.delete(`${BASE_URL}/invite/${userId}/unfollow`, {
      withCredentials: true,
    });
    console.log(resp.data);
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function retractFollowRequest(senderId) {
  try {
    const resp = await axios.delete(`${BASE_URL}/invite/${senderId}/retract`, {
      withCredentials: true,
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
