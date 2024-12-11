import { Avatar } from "@/components/shared/avatar";
import { selectUser } from "@/store/auth/authSlice";
import React from "react";
import { useSelector } from "react-redux";

export const CurrentUserCard = () => {
  const { user } = useSelector(selectUser);
  const { name, username } = user;

  return (
    <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
      <div className="h-12 w-12 rounded-full flex items-center justify-center uppercase text-3xl bg-gray-500 text-white">
        {name[0]}
      </div>
      <div className="text-sm font-semibold mt-2">{name}</div>
      <div className="text-xs text-gray-500">{username}</div>
      {/* <div className="flex flex-row items-center mt-3">
        <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
          <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
        </div>
        <div className="leading-none ml-1 text-xs">Active</div>
      </div> */}
    </div>
  );
};
