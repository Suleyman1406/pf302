import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { deletePostComment, editPostComment } from "@/services/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { Edit2Icon } from "lucide-react";
import { UserCircle2Icon } from "lucide-react";
import moment from "moment";
import Spinner from "../../spinner";
import { POST_COMMENT_QUERY_KEY } from "@/constants/query-keys";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { BanIcon } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "../../avatar";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/auth/authSlice";

export const Comment = ({ comment, postId }) => {
  const { user: currentUser } = useSelector(selectUser);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef();
  const queryClient = useQueryClient();
  const { content, createdAt, updatedAt, _id, user } = comment;
  const isEdited = createdAt !== updatedAt;
  const { mutate, isPending: isDeletePending } = useMutation({
    mutationFn: deletePostComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POST_COMMENT_QUERY_KEY, postId],
      });
    },
  });
  const { mutate: mutateEdit, isPending: isEditPending } = useMutation({
    mutationFn: editPostComment,
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({
        queryKey: [POST_COMMENT_QUERY_KEY, postId],
      });
    },
  });

  const isPending = isDeletePending || isEditPending;

  function handleDelete() {
    mutate({
      postId,
      commentId: _id,
    });
  }

  function toggleEdit() {
    if (!isEditing) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 5);
    }
    setIsEditing((prev) => !prev);
  }

  function handleEdit(e) {
    e.preventDefault();
    mutateEdit({
      commentId: _id,
      postId,
      content: inputRef.current.value,
    });
  }

  const isOwner = user._id === currentUser._id;

  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center space-x-2">
        <Avatar user={user} />
        <div>
          <div className="flex gap-3">
            <p className="text-gray-800 font-semibold max-w-16">
              {user?.name ?? "Anonymous"}
            </p>
            <p className="text-[10px] leading-[10px] text-muted-foreground translate-y-1">
              {moment(createdAt).format("DD MMM YY")}
            </p>
            {isEdited && (
              <span className="-ml-2 text-[10px] leading-[10px] text-muted-foreground/75 translate-y-1">
                (edited at {moment(updatedAt).format("DD MMM YY")})
              </span>
            )}
          </div>
          <form onSubmit={handleEdit}>
            <Input
              ref={inputRef}
              disabled={isPending}
              className={cn(
                "px-1 py-0.5 text-xs h-fit rounded-sm",
                isEditing ? "block" : "hidden"
              )}
              defaultValue={content}
            />
          </form>
          <p
            className={cn(
              "text-gray-500 max-w-[220px]",
              isEditing ? "hidden" : "block"
            )}
          >
            {content}
          </p>
        </div>
      </div>
      {isOwner && (
        <div className="flex items-center">
          <Button
            disabled={isPending}
            onClick={toggleEdit}
            size="xs"
            variant="ghost"
          >
            {isEditPending ? (
              <Spinner />
            ) : isEditing ? (
              <BanIcon className="h-3 w-3" />
            ) : (
              <Edit2Icon className="h-3 w-3" />
            )}
          </Button>
          <Button
            disabled={isPending}
            onClick={handleDelete}
            size="xs"
            variant="ghost"
          >
            {isDeletePending ? <Spinner /> : <Trash2Icon className="h-3 w-3" />}
          </Button>
        </div>
      )}
    </div>
  );
};

Comment.Skeleton = function () {
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="rounded-full w-6 h-6" />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <Skeleton className="w-20 h-3" />
          <Skeleton className="w-12 h-3" />
        </div>
        <Skeleton className="w-24 h-3" />
      </div>
    </div>
  );
};
