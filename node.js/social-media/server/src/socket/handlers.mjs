import Message from "../mongoose/schemas/message.mjs";
import Conversation from "../mongoose/schemas/conversation.mjs";

export function socketHandlers(socket, socketUsers) {
  socket.on("register", (data) => onRegister(data, socket, socketUsers));

  socket.on("message", (data) => onMessage(data, socket, socketUsers));

  socket.on("mark-as-read", (data) => onReadAll(data, socket, socketUsers));
  socket.on("disconnect", () => onDisconnect(socket, socketUsers));
}

async function onMessage(
  { to, content, conversationId, from },
  socket,
  socketUsers
) {
  try {
    const toSocketId = socketUsers.find((user) => user.userId === to)?.socketId;

    const message = await Message.create({
      user: from,
      content,
    });

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) return;
    conversation.messages.push(message._id);
    if (conversation.user1.toString() === to) {
      conversation.user1UnreadMessageCount += 1;
      conversation.user2UnreadMessageCount = 0;
    } else {
      conversation.user2UnreadMessageCount += 1;
    }
    await conversation.save();

    const unreadCount =
      conversation.user1.toString() === to
        ? conversation.user1UnreadMessageCount
        : conversation.user2UnreadMessageCount;

    if (toSocketId) {
      socket.to(toSocketId).emit("message", {
        message: content,
        conversationId: conversation._id,
        from,
        unreadCount,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

async function onReadAll({ conversationId }) {
  try {
    await Conversation.findByIdAndUpdate(conversationId, {
      user1UnreadMessageCount: 0,
      user2UnreadMessageCount: 0,
    });
  } catch (err) {
    console.log(err);
  }
}

function onRegister({ userId }, socket, socketUsers) {
  socketUsers.push({ userId, socketId: socket.id });
}

function onDisconnect(socket, socketUsers) {
  const userIndex = socketUsers.findIndex(
    (user) => user.socketId === socket.id
  );
  socketUsers.splice(userIndex, 1);
  console.log("user disconnected", socket.id);
}
