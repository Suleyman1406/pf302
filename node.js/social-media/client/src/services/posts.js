import { BASE_URL } from "@/constants";
import axios from "axios";

export async function getPosts({ pageParam, search = "", sort = "" }) {
  try {
    const response = await axios.get(
      `${BASE_URL}/post?page=${pageParam}&search=${search}&sort=${sort}&limit=3`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
export async function createPost({ data }) {
  try {
    const response = await axios.post(`${BASE_URL}/post`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
export async function editPost({ id, data }) {
  try {
    const response = await axios.put(`${BASE_URL}/post/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function deletePost({ id }) {
  try {
    const response = await axios.delete(`${BASE_URL}/post/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function toggleLikePost({ id }) {
  try {
    const response = await axios.put(
      `${BASE_URL}/post/${id}/like`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function getPostComments({ postId }) {
  try {
    const response = await axios.get(`${BASE_URL}/comment/${postId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function createPostComment({ postId, content }) {
  try {
    const response = await axios.post(
      `${BASE_URL}/comment/${postId}`,
      {
        content,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function deletePostComment({ commentId }) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.delete(`${BASE_URL}/comment/${commentId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function editPostComment({ commentId, content }) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await axios.put(
      `${BASE_URL}/comment/${commentId}`,
      {
        content,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
