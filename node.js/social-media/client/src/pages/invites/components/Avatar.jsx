import { UserCircle2Icon } from "lucide-react";
import React from "react";

const Avatar = ({ invite }) => {
  if (!invite.sender.avatar) {
    return <UserCircle2Icon className="w-9 h-9" />;
  }

  return (
    <img
      src={invite.sender.avatar}
      alt="User Avatar"
      className="w-8 h-8 rounded-full object-cover"
    />
  );
};

export default Avatar;
