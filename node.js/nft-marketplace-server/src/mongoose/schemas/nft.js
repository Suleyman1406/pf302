const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "Creator",
  },
  imgPath: {
    type: String,
    required: true,
  },
  price: {
    value: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  highestBid: {
    value: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
});

const NFT = mongoose.model("NFT", nftSchema);

module.exports = NFT;

const boxSchema = new mongoose.Schema({
  items: {
    type: [mongoose.Types.ObjectId],
    ref: "Product",
    default: [],
  },
  price: {
    type: Number,
    default: 0,
  },
});

/*
  Products
    GET  /products
    POST  /products
    PUT  /products/:id
    DELETE  /products/:id

  Boxes
    GET /boxes
    GET /boxes/:id
    POST /boxes  ~ box yaratmaq
    POST /boxes/:id/add/:productId ~ product elave etmek
    POST /boxes/:id/remove/:productId ~ product silmek
    DELETE /boxes/:id ~ box silmek

*/
