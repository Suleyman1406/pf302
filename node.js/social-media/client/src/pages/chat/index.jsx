import React, { useState } from "react";
import { CurrentUserCard } from "./components/CurrentUserCard";
import { Conversations } from "./components/Conversations";
import { Chat } from "./components/Chat";
import { useParams } from "react-router-dom";
import { useSocket } from "@/hooks/useSocket";
import { useEffect } from "react";

const ChatPage = () => {
  const { id } = useParams();
  const socket = useSocket();

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
            </div>
            <div className="ml-2 font-bold text-2xl">QuickChat</div>
          </div>
          <CurrentUserCard />
          <Conversations />
        </div>
        {id && <Chat socket={socket} />}
        {!id && (
          <div className="flex flex-col items-center justify-center flex-grow bg-gray-100">
            <div className="text-2xl font-bold">
              Select a chat to start messaging
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
