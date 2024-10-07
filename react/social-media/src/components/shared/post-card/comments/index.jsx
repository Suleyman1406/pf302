import React from "react";
import { CommentCreate } from "./create";

import { useQuery } from "@tanstack/react-query";
import { POST_COMMENT_QUERY_KEY } from "@/constants/query-keys";
import { getPostComments } from "@/services/posts";
import { Comment } from "./comment";

export const PostComments = ({ postId, isOpen }) => {
  const { data, isLoading } = useQuery({
    queryKey: [POST_COMMENT_QUERY_KEY, postId],
    queryFn: () => getPostComments({ postId }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <hr className="mt-2 mb-2" />
      <p className="text-gray-800 font-semibold">Comments</p>
      <hr className="mt-2 mb-2" />
      <div className="mt-4 flex flex-col gap-3">
        {isLoading && (
          <>
            <Comment.Skeleton />
            <Comment.Skeleton />
            <Comment.Skeleton />
          </>
        )}
        {data?.map((comment) => (
          <Comment postId={postId} key={comment.id} comment={comment} />
        ))}
        {data && data.length === 0 && (
          <p className="text-gray-500 text-xs">No comments yet</p>
        )}
      </div>
      <CommentCreate postId={postId} />
    </div>
  );
};
