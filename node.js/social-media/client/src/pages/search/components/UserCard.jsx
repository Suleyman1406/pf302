import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/ui/button";
import {
  retractFollowRequest,
  sendFollowRequest,
  unfollowUser,
} from "@/services/invites";
import { USER_FRIENDSHIP_STATUS } from "@/constants";

const UserCard = ({ user }) => {
  const [status, setStatus] = useState(user.status);

  const buttonLabel =
    status === USER_FRIENDSHIP_STATUS.FRIEND
      ? "Remove"
      : status === USER_FRIENDSHIP_STATUS.PENDING
      ? "Cancel"
      : "Follow";
  const statusLabel =
    status === USER_FRIENDSHIP_STATUS.FRIEND
      ? "Friend"
      : status === USER_FRIENDSHIP_STATUS.PENDING
      ? "Request Sent"
      : "";

  const handleRequest = async () => {
    try {
      if (status === USER_FRIENDSHIP_STATUS.FRIEND) {
        await unfollowUser(user._id);
        setStatus(USER_FRIENDSHIP_STATUS.STRANGER);
      } else if (status === USER_FRIENDSHIP_STATUS.PENDING) {
        await retractFollowRequest(user._id);
        setStatus(USER_FRIENDSHIP_STATUS.STRANGER);
      } else {
        await sendFollowRequest(user._id);
        setStatus(USER_FRIENDSHIP_STATUS.PENDING);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-5">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <Avatar user={user} />
        )}
        <div className="ml-4">
          <p className="font-semibold">{user.username || user.name}</p>
        </div>
        <div className="flex gap-x-2 items-center">
          <p>{statusLabel}</p>
          <Button onClick={handleRequest}>{buttonLabel}</Button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
