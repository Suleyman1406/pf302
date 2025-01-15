import mongoose, { Types } from "mongoose";

const rentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fuel: {
    type: String,
    required: true,
  },
  gear: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  imageUrls: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    optional: true,
    default: null,
  },
  category: {
    type: Types.ObjectId,
    ref: "Category",
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  pickUpLocations: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Location",
    default: [],
  },
  dropOffLocations: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Location",
    default: [],
  },
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Review",
    default: [],
  },
  showInRecommendation: {
    type: Boolean,
    default: false,
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

const Rent = mongoose.model("Rent", rentSchema);

export default Rent;
