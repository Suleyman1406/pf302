import mongoose, { Types } from "mongoose";

const commentSchema = new mongoose.Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: Types.ObjectId,
    ref: "Post",
    required: true,
  },
  content: {
    type: String,
    required: true,
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

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
