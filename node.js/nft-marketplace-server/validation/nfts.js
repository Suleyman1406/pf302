const createNftValidationSchema = {
  creatorId: {
    in: ["body"],
    notEmpty: true,
    matches: {
      options: /[a-z]+/i,
      errorMessage: "Must contain at least 1 lowercase letter",
    },
  },
  priceValue: {
    in: ["body"],
    notEmpty: true,
  },
  priceCurrency: {
    in: ["body"],
    notEmpty: true,
  },
  highestBidValue: {
    in: ["body"],
    notEmpty: true,
  },
  highestBidCurrency: {
    in: ["body"],
    notEmpty: true,
  },
  name: {
    in: ["body"],
    notEmpty: true,
  },
};

module.exports = {
  createNftValidationSchema,
};
