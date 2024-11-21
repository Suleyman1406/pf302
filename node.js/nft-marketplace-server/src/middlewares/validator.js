const {
  checkSchema,
  matchedData,
  validationResult,
} = require("express-validator");

const validate = (schema) => {
  return async (req, res, next) => {
    await checkSchema(schema).run(req);
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    req.matchedData = matchedData(req);
    next();
  };
};

module.exports = validate;
