const express = require("express");

const { PORT } = require("./constants.js");
const creatorsRouter = require("./routes/creators.js");
const nftsRouter = require("./routes/nfts.js");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to NFT MarketPlace");
});

app.use("/creators", creatorsRouter);
app.use("/nfts", nftsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
