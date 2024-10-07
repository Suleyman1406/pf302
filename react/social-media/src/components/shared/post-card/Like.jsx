import { cn } from "@/lib/utils";
import { dislikePost, likePost } from "@/services/posts";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import Spinner from "../spinner";
import { useState } from "react";
import { useEffect } from "react";

export const PostLike = ({ liked, postId }) => {
  const [isLiked, setIsLiked] = useState(liked);
  const { mutate, isPending, data } = useMutation({
    mutationFn: isLiked ? dislikePost : likePost,
  });
  function handleLikeClick() {
    mutate({ id: postId });
  }

  useEffect(() => {
    if (data) setIsLiked(data.liked);
  }, [data]);

  return (
    <button
      disabled={isPending}
      onClick={handleLikeClick}
      className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
    >
      {isPending ? (
        <Spinner />
      ) : (
        <svg
          className={cn("w-5 h-5 fill-current", isLiked && "fill-red-500")}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}
    </button>
  );
};
