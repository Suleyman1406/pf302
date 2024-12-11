import mongoose, { Types } from "mongoose";

const conversationSchema = new mongoose.Schema({
  user1: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  user2: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: {
    type: [Types.ObjectId],
    ref: "Message",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
