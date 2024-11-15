const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");

const { creators } = require("../data/index.js");

const router = Router();

router.get("/", (req, res) => {
  res.json(creators);
});

router.post("/", (req, res) => {
  const { name, totalSale, volume, nftSold, followers, bio, chainId } =
    req.body;

  if (
    !name ||
    !totalSale ||
    !totalSale.value ||
    !totalSale.currency ||
    !volume ||
    !nftSold ||
    !followers ||
    !bio ||
    !chainId
  ) {
    return res
      .status(400)
      .json({ error: "Please provide all the required fields" });
  }

  const creator = {
    id: uuidv4(),
    name,
    totalSale,
    volume,
    nftSold,
    followers,
    bio,
    chainId,
  };

  creators.push(creator);

  res.status(201).json({
    success: true,
    data: creator,
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, totalSale, volume, nftSold, followers, bio, chainId } =
    req.body;

  const creator = creators.find((creator) => creator.id === id);

  if (!creator) {
    return res.status(404).json({ error: "Creator not found" });
  }

  if (
    !name ||
    !totalSale ||
    !totalSale.value ||
    !totalSale.currency ||
    !volume ||
    !nftSold ||
    !followers ||
    !bio ||
    !chainId
  ) {
    return res
      .status(400)
      .json({ error: "Please provide all the required fields" });
  }

  creator.name = name;
  creator.totalSale = totalSale;
  creator.volume = volume;
  creator.nftSold = nftSold;
  creator.followers = followers;
  creator.bio = bio;
  creator.chainId = chainId;

  res.status(200).json({
    success: true,
    data: creator,
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const creatorIndex = creators.findIndex((creator) => creator.id === id);

  if (creatorIndex === -1) {
    return res.status(404).json({ error: "Creator not found" });
  }

  const creator = creators.splice(creatorIndex, 1)[0];

  res.json({
    success: true,
    data: creator,
  });
});

module.exports = router;
