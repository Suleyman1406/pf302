const mongoose = require("mongoose");

const creatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalSale: {
    value: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  profileImgPath: {
    type: String,
    required: false,
  },
  volume: {
    type: String,
    required: true,
  },
  nftSold: {
    type: Number,
    required: true,
  },
  followers: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  chainId: {
    type: String,
    required: true,
  },
});

const Creator = mongoose.model("Creator", creatorSchema);

module.exports = Creator;
