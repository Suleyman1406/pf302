const Creator = require("../mongoose/schemas/creator.js");

const getAll = async (req, res) => {
  const items = await Creator.find();
  res.json({
    items,
  });
};

const create = async (req, res) => {
  try {
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

    const creator = new Creator({
      name,
      totalSale,
      volume,
      nftSold,
      followers,
      bio,
      chainId,
    });
    await creator.save();

    res.status(201).json({
      success: true,
      data: creator,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, totalSale, volume, nftSold, followers, bio, chainId } =
      req.body;

    const creator = await Creator.findById(id);
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

    await creator.save();

    res.status(200).json({
      success: true,
      data: creator,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const creator = await Creator.findByIdAndDelete(id);

    if (!creator) {
      return res.status(404).json({ error: "Creator not found" });
    }

    res.json({
      success: true,
      data: creator,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
