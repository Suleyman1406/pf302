import { Schema } from "express-validator";

export const createReviewSchema: Schema = {
  content: {
    in: ["body"],
    isString: true,
    isLength: {
      errorMessage: "Content should be at least 5 chars long",
      options: { min: 5 },
    },
  },
  rate: {
    in: ["body"],
    isInt: {
      errorMessage: "Rate should be between 1 and 5",
      options: { min: 1, max: 5 },
    },
  },
  reservationId: {
    in: ["body"],
    isMongoId: true,
    errorMessage: "Invalid reservation id",
  },
};

export const ChangeReviewStatusSchema: Schema = {
  status: {
    in: ["body"],
    isString: true,
    matches: {
      options: [/\b(?:Pending|Rejected|Approved)\b/],
      errorMessage: "Invalid Status",
    },
    notEmpty: true,
  },
};
