export const postCreateSchema = {
  title: {
    in: ["body"],
    isString: true,
    isLength: {
      errorMessage: "Title should be at least 3 chars long",
      options: { min: 3 },
    },
  },
  content: {
    in: ["body"],
    isString: true,
    isLength: {
      errorMessage: "Content should be at least 10 chars long",
      options: { min: 10 },
    },
  },
  tags: {
    in: ["body"],
    isString: true,
    optional: true,
  },
  image: {
    custom: {
      errorMessage: "Image is required",
      options: (value, { req }) => {
        if (!req.file) {
          return false;
        }
        return true;
      },
    },
  },
};
export const postEditSchema = {
  title: {
    in: ["body"],
    isString: true,
    isLength: {
      errorMessage: "Title should be at least 3 chars long",
      options: { min: 3 },
    },
  },
  content: {
    in: ["body"],
    isString: true,
    isLength: {
      errorMessage: "Content should be at least 10 chars long",
      options: { min: 10 },
    },
  },
  tags: {
    in: ["body"],
    isString: true,
    optional: true,
  },
};
