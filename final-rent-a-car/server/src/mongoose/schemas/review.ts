import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rent",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Rejected", "Approved"],
    default: "Pending",
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

const Review = mongoose.model("Review", reviewSchema);

export default Review;
