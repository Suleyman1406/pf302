import axiosInstance from "./instance";

export async function getPosts({ pageParam, search = "", sort = "" }) {
  try {
    const response = await axiosInstance.get(
      `/post?page=${pageParam}&search=${search}&sort=${sort}&limit=3`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function getFeed({
  pageParam,
  search = "",
  sort = "",
  limit = 10,
}) {
  try {
    const resp = await axiosInstance.get(
      `/post/feed?page=${pageParam}&search=${search}&sort=${sort}&limit=10`
    );
    return resp.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function createPost({ data }) {
  try {
    const response = await axiosInstance.post(`/post`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function editPost({ id, data }) {
  try {
    const response = await axiosInstance.put(`/post/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function deletePost({ id }) {
  try {
    const response = await axiosInstance.delete(`/post/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function toggleLikePost({ id }) {
  try {
    const response = await axiosInstance.put(
      `/post/${id}/like`,
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
    const response = await axiosInstance.get(`/comment/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function createPostComment({ postId, content }) {
  try {
    const response = await axiosInstance.post(`/comment/${postId}`, {
      content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function deletePostComment({ commentId }) {
  try {
    const response = await axiosInstance.delete(`/comment/${commentId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function editPostComment({ commentId, content }) {
  try {
    const response = await axiosInstance.put(
      `/comment/${commentId}`,
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
