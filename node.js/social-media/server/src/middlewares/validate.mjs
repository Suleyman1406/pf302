import { checkSchema, matchedData, validationResult } from "express-validator";

const validateSchema = (schema) => {
  return async (req, res, next) => {
    await checkSchema(schema).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    req.matchedData = matchedData(req);
    next();
  };
};

export default validateSchema;
