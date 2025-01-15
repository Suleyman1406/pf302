import { Schema } from "express-validator";

export const createLocationSchema: Schema = {
  title: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    isLength: {
      options: { min: 3 },
    },
  },
};
