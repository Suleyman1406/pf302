import { Skeleton } from "@/components/ui/skeleton";
import { UserCircle2Icon } from "lucide-react";
import moment from "moment";
import React from "react";
import { PostCardAction } from "./Actions";
import { PostLike } from "./Like";
import { PostComments } from "./comments";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/auth/authSlice";
import { Avatar } from "../avatar";

export const PostCard = ({ post }) => {
  const { user: currentUser } = useSelector(selectUser);
  const { _id, user, imageUrl, content, tags, title, createdAt, likes } = post;
  const [collapsed, setCollapsed] = useState(true);

  const time = moment(createdAt).fromNow();
  // const commentCount = comments.length;

  function toogleCollapse() {
    setCollapsed((prev) => !prev);
  }

  const isOwner = user._id === currentUser._id;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md shadow-purple-200 max-w-md min-w-[400px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Avatar user={user} />
          <div>
            <p className="text-gray-800 font-semibold">
              {user?.name ?? "Anonymous"}
            </p>
            <p className="text-gray-500 text-sm">Posted {time}</p>
          </div>
        </div>
        {isOwner && <PostCardAction post={post} />}
      </div>

      <div className="mb-4">
        <h4 className="text-gray-800">{title}</h4>
        <p className="text-gray-600 text-sm">{content}</p>
        {tags &&
          tags.map((tag, idx) => (
            <span key={idx} className="text-gray-500 text-sm">
              #{tag}
            </span>
          ))}
      </div>

      <div className="mb-4">
        <img
          src={imageUrl}
          alt="Post Image"
          className="w-full h-48 object-contain rounded-md"
        />
      </div>

      <div className="flex items-center justify-between text-gray-500">
        <PostLike likes={likes} postId={_id} />
        <button
          onClick={toogleCollapse}
          className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
        >
          <svg
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
              ></path>
            </g>
          </svg>
          <span>
            {/* {commentCount}  */}
            Comment
          </span>
        </button>
      </div>

      <Collapsible open={!collapsed} onOpenChange={setCollapsed}>
        <CollapsibleContent>
          <PostComments isOpen={!collapsed} postId={_id} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

PostCard.Skeleton = () => {
  return <Skeleton className="w-[400px] h-[448px] max-w-full" />;
};
