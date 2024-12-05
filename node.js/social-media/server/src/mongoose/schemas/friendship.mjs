import { model, Schema, Types } from "mongoose";

const FriendshipSchema = new Schema({
  sender: {
    type: Types.ObjectId,
    ref: "User",
  },
  recipient: {
    type: Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
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

const Friendship = model("Invite", FriendshipSchema);

export default Friendship;
