import { NextFunction, Request, Response } from "express";
import {
  checkSchema,
  matchedData,
  validationResult,
  Schema,
} from "express-validator";
import { deleteFiles } from "../utils/file";

const validateSchema = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await checkSchema(schema).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.files) {
        deleteFiles(req.files as Express.Multer.File[]);
      }
      res.status(400).json({ errors: errors.array() });
      return;
    }
    req.matchedData = matchedData(req);
    next();
  };
};

export default validateSchema;
