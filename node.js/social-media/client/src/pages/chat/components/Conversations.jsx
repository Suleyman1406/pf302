import { Avatar } from "@/components/shared/avatar";
import Spinner from "@/components/shared/spinner";
import {
  CHAT_CONVERSATIONS_KEY,
  CHAT_FRIENDS_KEY,
} from "@/constants/query-keys";
import { cn } from "@/lib/utils";
import { getConversations, getFriends } from "@/services/users";
import { selectUser } from "@/store/auth/authSlice";
import { useQueries } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const Conversations = ({ socket }) => {
  const [conversationUnreadCount, setConversationUnreadCount] = useState({});
  const [
    { data: friendsData, isLoading: isFriendsLoading },
    { data: conversationData, isLoading: conversationsLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: [CHAT_FRIENDS_KEY],
        queryFn: getFriends,
      },
      {
        queryKey: [CHAT_CONVERSATIONS_KEY],
        queryFn: getConversations,
      },
    ],
  });

  useEffect(() => {
    if (!socket) return;
    socket.on("message", (data) => {
      conversationUnreadCount[data.conversationId] = data.unreadCount;
      setConversationUnreadCount({ ...conversationUnreadCount });
    });
  }, [socket]);

  function deleteFromSocketCount(conversationId) {
    delete conversationUnreadCount[conversationId];
    setConversationUnreadCount({ ...conversationUnreadCount });
  }

  if (isFriendsLoading || conversationsLoading) {
    return (
      <div className="mt-8 mx-auto w-fit">
        <Spinner size={32} />
      </div>
    );
  }

  const conversationCount = conversationData.items.filter(
    (c) => c.messages.length > 0
  ).length;

  return (
    <div className="flex flex-col mt-8">
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">Friends</span>
        <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
          {friendsData.items.length}
        </span>
      </div>
      <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
        {friendsData.items.map((user) => (
          <UserItem user={user} key={user._id} />
        ))}
      </div>
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">Conversation</span>
        <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
          {conversationCount}
        </span>
      </div>
      <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
        {conversationData.items.map((conversation) => (
          <ConversationItem
            socket={socket}
            onSocketCountReset={deleteFromSocketCount}
            unreadSocketCount={conversationUnreadCount[conversation._id]}
            conversation={conversation}
            key={conversation._id}
          />
        ))}
      </div>
    </div>
  );
};

function ConversationItem({
  onSocketCountReset,
  unreadSocketCount,
  conversation,
  socket,
}) {
  const { id } = useParams();
  const { user } = useSelector(selectUser);
  const receiver =
    conversation.user1._id === user._id
      ? conversation.user2
      : conversation.user1;
  if (conversation.messages.length === 0) return null;
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  const isActive = id === receiver._id;
  const unreadCount =
    unreadSocketCount ??
    (user._id === conversation.user1._id
      ? conversation.user1UnreadMessageCount
      : conversation.user2UnreadMessageCount);

  const showUnreadCount = unreadCount > 0 && !isActive;

  useEffect(() => {
    if (isActive && unreadSocketCount > 0) {
      socket.emit("mark-as-read", { conversationId: conversation._id });
      onSocketCountReset(conversation._id);
    }
  }, [unreadSocketCount, isActive]);

  return (
    <Link
      to={`/chat/${receiver._id}`}
      className={cn(
        "flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 ",
        isActive && "bg-gray-100"
      )}
    >
      {receiver.avatar ? (
        <Avatar src={receiver.avatar} size="h-8 w-8" />
      ) : (
        <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full uppercase">
          {receiver.name[0]}
        </div>
      )}
      <div className="ml-2 text-sm font-semibold flex flex-col gap-2">
        <span>{receiver.name}</span>
        <span className="text-xs text-muted-foreground">
          {lastMessage.content}
        </span>
      </div>
      {showUnreadCount && (
        <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
          {unreadCount}
        </div>
      )}
    </Link>
  );
}
function UserItem({ user }) {
  return (
    <Link
      to={`/chat/${user._id}`}
      className={cn(
        "flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 "
      )}
    >
      {user.avatar ? (
        <Avatar src={user.avatar} size="h-8 w-8" />
      ) : (
        <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full uppercase">
          {user.name[0]}
        </div>
      )}
      <div className="ml-2 text-sm font-semibold">{user.name}</div>
      {/* <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
        2
      </div> */}
    </Link>
  );
}
