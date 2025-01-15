import { Schema } from "express-validator";

export const createReservationSchema: Schema = {
  "billing.name": {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  "billing.phoneNumber": {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  "billing.address": {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  "billing.city": {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  pickUpLocation: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    isMongoId: true,
  },
  pickUpDate: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  dropOffLocation: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    isMongoId: true,
  },
  dropOffDate: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  rent: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    isMongoId: true,
  },
};

export const changeReservationStatusSchema: Schema = {
  status: {
    in: ["body"],
    matches: {
      options: [/\b(?:Pending|Rejected|Approved|Cancelled)\b/],
      errorMessage: "Invalid Status",
    },
    isString: true,
    notEmpty: true,
  },
};
