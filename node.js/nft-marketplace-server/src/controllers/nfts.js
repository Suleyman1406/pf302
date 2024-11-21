const NFT = require("../mongoose/schemas/nft");
const Creator = require("../mongoose/schemas/creator");

const BASE_URL = process.env.BASE_URL;

const getAll = async (req, res) => {
  try {
    const take = +(req.query.take ?? 10);
    const skip = +(req.query.skip ?? 0);
    const search = (req.query.search ?? "").trim();
    const sort = req.query.sort;

    const filterObj = {
      $or: [],
      $and: [],
    };
    const sortObj = {};

    if (search) {
      filter.$or.push(
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          imgPath: {
            $regex: search,
            $options: "i",
          },
        }
      );
    }

    if (sort) {
      const [field, order] = sort.split("-");
      switch (field) {
        case "price":
          sortObj["price.value"] = order === "asc" ? "asc" : "desc";
          break;
        case "name":
          sortObj["name"] = order === "asc" ? "asc" : "desc";
          break;
      }
    }

    const nfts = await NFT.find(filterObj)
      .populate("creator", "name")
      .limit(take)
      .skip(skip)
      .sort(sortObj);

    const total = await NFT.countDocuments(filterObj).populate(
      "creator",
      "name"
    );
    const items = nfts.map((nft) => {
      nft = nft.toObject();
      nft.imgPath = `${BASE_URL}${nft.imgPath}`;
      return nft;
    });

    res.json({
      skip,
      take,
      total,
      hasMore: skip + take < total,
      items,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const create = async (req, res) => {
  try {
    const {
      creatorId,
      priceValue,
      priceCurrency,
      highestBidValue,
      highestBidCurrency,
      name,
    } = req.matchedData;

    const creator = await Creator.findById(creatorId);

    if (!creator) {
      return res.status(404).json({
        success: false,
        message: "Creator not found",
      });
    }

    const nft = new NFT({
      name,
      creator: creatorId,
      price: {
        value: priceValue,
        currency: priceCurrency,
      },
      highestBid: {
        value: highestBidValue,
        currency: highestBidCurrency,
      },
      imgPath: req.file.path,
    });
    await nft.save();

    res.status(201).json({
      success: true,
      item: nft,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      creatorId,
      priceValue,
      priceCurrency,
      highestBidValue,
      highestBidCurrency,
      name,
    } = req.matchedData;

    const nft = await NFT.findById(id);

    if (!nft) {
      return res.status(404).json({
        success: false,
        message: "NFT not found",
      });
    }

    if (req.file) {
      nft.imgPath = req.file.path;
    }
    nft.creator = creatorId;
    nft.price = {
      value: priceValue,
      currency: priceCurrency,
    };
    nft.highestBid = {
      value: highestBidValue,
      currency: highestBidCurrency,
    };
    nft.name = name;

    await nft.save();

    res.json({
      success: true,
      data: nft,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const nft = await NFT.findByIdAndDelete(id);

    if (!nft) {
      return res.status(404).json({
        success: false,
        message: "NFT not found",
      });
    }

    res.json({
      success: true,
      item: nft,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
