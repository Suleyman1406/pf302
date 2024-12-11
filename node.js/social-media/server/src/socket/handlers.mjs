import Message from "../mongoose/schemas/message.mjs";
import Conversation from "../mongoose/schemas/conversation.mjs";

export function socketHandlers(socket, socketUsers) {
  socket.on("register", (data) => onRegister(data, socket, socketUsers));

  socket.on("message", (data) => onMessage(data, socket, socketUsers));

  socket.on("disconnect", () => onDisconnect(socket, socketUsers));
}

async function onMessage({ to, content, conversationId }, socket, socketUsers) {
  const toSocketId = socketUsers.find((user) => user.userId === to)?.socketId;
  const fromUserId = socketUsers.find(
    (user) => user.socketId === socket.id
  )?.userId;

  const message = await Message.create({
    user: fromUserId,
    content,
  });

  await Conversation.findByIdAndUpdate(conversationId, {
    $push: { messages: message._id },
  });

  if (toSocketId) {
    socket
      .to(toSocketId)
      .emit("message", { message: content, from: fromUserId });
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
