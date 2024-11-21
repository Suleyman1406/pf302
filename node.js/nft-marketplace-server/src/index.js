const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const creatorsRouter = require("./routes/creators.js");
const nftsRouter = require("./routes/nfts.js");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/creators", creatorsRouter);
app.use("/nfts", nftsRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function main() {
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  await mongoose.connect(
    `mongodb+srv://${username}:${password}@cluster0.kqwzu.mongodb.net/nft-marketplace?retryWrites=true&w=majority&appName=Cluster0`
  );
}

main()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => console.log(err));
