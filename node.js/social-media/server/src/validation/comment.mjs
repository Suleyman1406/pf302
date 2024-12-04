export const commentSchema = {
  content: {
    in: ["body"],
    isString: true,
    isLength: {
      errorMessage: "Comment should be at least 5 chars long",
      options: { min: 5 },
    },
  },
};
