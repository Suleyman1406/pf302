const { Router } = require("express");
const {
  query,
  validationResult,
  body,
  checkSchema,
} = require("express-validator");

const { nfts, creators } = require("../data");
const { createNftValidationSchema } = require("../validation/nfts");

const router = Router();

router.get("/", (req, res) => {
  const take = +(req.query.take ?? 10);
  const skip = +(req.query.skip ?? 0);
  const search = (req.query.search ?? "").trim();
  const includeCreator = req.query.includeCreator === "true";
  const sort = req.query.sort;

  let filteredNfts = nfts;

  if (search) {
    filteredNfts = filteredNfts.filter((nft) =>
      nft.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort) {
    const [field, order] = sort.split("-");
    filteredNfts.sort((a, b) => {
      switch (field) {
        case "name":
          return order === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case "price":
          return order === "asc"
            ? a.price.value - b.price.value
            : b.price.value - a.price.value;
        default:
          return 0;
      }
    });
  }

  const nftsPage = filteredNfts.slice(skip, skip + take);

  if (includeCreator) {
    nftsPage.forEach((nft) => {
      const creator = creators.find((creator) => creator.id === nft.creatorId);
      if (creator) {
        nft.creator = creator;
      }
    });
  }

  res.json({
    skip,
    take,
    total: filteredNfts.length,
    hasMore: skip + take < filteredNfts.length,
    data: nftsPage,
  });
});

router.post("/", checkSchema(createNftValidationSchema), (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const {
    creatorId,
    priceValue,
    priceCurrency,
    highestBidValue,
    highestBidCurrency,
    name,
  } = req.body;

  const nft = {
    id: uuidv4(),
    creatorId,
    price: {
      value: priceValue,
      currency: priceCurrency,
    },
    highestBid: {
      value: highestBidValue,
      currency: highestBidCurrency,
    },
    name,
  };

  nfts.push(nft);

  res.status(201).json({
    success: true,
    data: nft,
  });
});

module.exports = router;
