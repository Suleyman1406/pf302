import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit2Icon } from "lucide-react";
import { Trash2Icon } from "lucide-react";
import { useDialog } from "@/hooks/useDialog";
import { MODAL_TYPE } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/services/posts";
import { POST_QUERY_KEY } from "@/constants/query-keys";
import Spinner from "../spinner";

export const PostCardAction = ({ post }) => {
  const { setIsOpen } = useDialog();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POST_QUERY_KEY] });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isPending} asChild>
        <button className="hover:bg-gray-50 rounded-full p-1 text-gray-500 cursor-pointer outline-none">
          {isPending ? (
            <Spinner />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="7" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="17" r="1" />
            </svg>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            setIsOpen(true, MODAL_TYPE.EDIT, post);
          }}
          className="flex gap-3 items-center"
        >
          <Edit2Icon className="h-4 w-4" />
          <p>Edit</p>
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex gap-3 items-center">
            <Trash2Icon className="h-4 w-4" />
            <p>Remove</p>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuLabel>
              Are you sure to delete this post?
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                mutate({ id: post._id });
              }}
              className="hover:!bg-destructive hover:!text-white"
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem>Cancel</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
